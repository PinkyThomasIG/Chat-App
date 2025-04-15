import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";

// Import Firebase Auth
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

// Import the background image
import backgroundImage from "../assets/BackgroundImage.png";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("#090C08"); // Background color

  // Function to sign in anonymously
  const signInUser = () => {
    const auth = getAuth(); // Get Firebase Auth instance
    const db = getFirestore(getApp());

    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;

        if (user) {
          navigation.navigate("Chat", {
            userID: user.uid,
            userName: name,
            bgColor: bgColor,
            db: db,
          });
        }
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
        Alert.alert("Sign-In Error", "Failed to sign in. Please try again.");
      });
  };

  return (
    <ImageBackground
      source={backgroundImage} // Set the background image
      style={styles.container} // Apply the styles to the container
      resizeMode="cover" // Resize mode for the background image
    >
      <Text style={styles.title}>Chat App</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#FFFFFF"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Choose background color:</Text>
      <View style={styles.colorOptions}>
        {["#090C08", "#474056", "#8A95A5", "#B9C6AE"].map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => setBgColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#757083" }]}
        onPress={signInUser}
      >
        <Text style={styles.buttonText}>Start chatting</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    opacity: 0.5,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default Start;
