import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";

const Chat = ({ route, navigation, isConnected }) => {
  const { userName, db, userID, bgColor } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set header title and set up Firestore listener
  useEffect(() => {
    navigation.setOptions({ title: userName });

    const fetchMessages = async () => {
      if (isConnected) {
        // If connected, listen for new messages from Firestore
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messagesFirestore = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text || "",
              createdAt: data.createdAt?.toDate() || new Date(),
              user: data.user || {},
            };
          });

          // Set messages and cache them locally
          setMessages(messagesFirestore);
          AsyncStorage.setItem(
            "messages",
            JSON.stringify(messagesFirestore)
          ).catch((error) => console.error("Error caching messages:", error));
        });

        return () => unsubscribe(); // Cleanup listener
      } else {
        // If not connected, try to fetch cached messages from AsyncStorage
        const cachedMessages = await AsyncStorage.getItem("messages");
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages));
        } else {
          Alert.alert("You are offline. No cached messages available.");
        }
      }
    };

    fetchMessages();
  }, [userName, navigation, db, isConnected]);

  // Save new message to Firestore
  const onSend = (newMessages = []) => {
    if (isConnected) {
      // Send the new message to Firestore
      addDoc(collection(db, "messages"), {
        _id: newMessages[0]._id,
        text: newMessages[0].text,
        createdAt: new Date(),
        user: {
          _id: userID,
          name: userName,
        },
      });
    } else {
      Alert.alert("You are offline. Message will be sent once connected.");
    }
  };

  // Conditionally render InputToolbar
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null; // Hide InputToolbar if offline
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userID,
          name: userName,
          avatar: "",
        }}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        isLoadingEarlier={loading}
        renderInputToolbar={renderInputToolbar} // Pass the renderInputToolbar function
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
