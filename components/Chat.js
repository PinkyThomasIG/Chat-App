import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = ({ route, navigation }) => {
  const { userName, bgColor } = route.params;

  // Set the userName in the header dynamically
  useEffect(() => {
    navigation.setOptions({
      title: userName, // Set the header title to user's name
    });
  }, [userName, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
      <Text style={styles.chatText}>This is your chat screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  chatText: {
    fontSize: 18,
    fontWeight: "300",
    color: "#FFFFFF",
  },
});

export default Chat;
