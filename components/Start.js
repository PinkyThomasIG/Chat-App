import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

// Import the background image
import backgroundImage from "../assets/BackgroundImage.png"; // Ensure the path is correct

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("#090C08"); // Background color (can still be changed)

  const handleStartChat = () => {
    navigation.navigate("Chat", { userName: name, bgColor });
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
        placeholderTextColor="#757083"
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
        onPress={handleStartChat}
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
    borderColor: "#757083",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
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
