import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { userName, bgColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Set the userName in the header dynamically
  useEffect(() => {
    navigation.setOptions({
      title: userName, // Set the header title to user's name
    });
    //  }, [userName, navigation]);
    setMessages([
      {
        _id: 1,
        text: "This is a system message",
        createdAt: new Date(),
        system: true, // This will be a system message
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, [userName, navigation]);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // The user will have _id 1
          name: userName,
        }}
        renderUsernameOnMessage={true} // Show user names on each message
        alwaysShowSend={true} // Always show the send button
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
