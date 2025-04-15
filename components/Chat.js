import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { userName, db, userID, bgColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Set header title and set up Firestore listener
  useEffect(() => {
    navigation.setOptions({ title: userName });

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

      setMessages(messagesFirestore);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [userName, navigation, db]);

  // Save new message to Firestore
  const onSend = (newMessages = []) => {
    addDoc(collection(db, "messages"), {
      _id: newMessages[0]._id,
      text: newMessages[0].text,
      createdAt: new Date(),
      user: {
        _id: userID,
        name: userName,
      },
    });
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
        }}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
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
