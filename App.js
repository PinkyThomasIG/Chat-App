// Import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import React Native AsyncStorage and NetInfo
import { useNetInfo } from "@react-native-community/netinfo";

// Initialize Firebase and Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native"; // Importing Alert to show message

import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8OAbcuS-Pk-NPEW6UEY3-1nmCMOwI-9Q",
  authDomain: "chatapp-7c125.firebaseapp.com",
  projectId: "chatapp-7c125",
  storageBucket: "chatapp-7c125.firebasestorage.app",
  messagingSenderId: "835969299500",
  appId: "1:835969299500:web:64d12f916f278fcc9e8d89",
};

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // State to store the db (Firestore) object and user authentication
  const [db, setDb] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isConnected, setIsConnected] = useState(true); // State for network connection status
  const [storage, setStorage] = useState(null);

  // Initialize Firebase, Firestore, and Auth
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app); // Get the Firestore instance correctly
    const storageInstance = getStorage(app); // Initialize storage here
    const auth = getAuth(app);

    // Sign in anonymously
    signInAnonymously(auth)
      .then((result) => {
        console.log("Signed in anonymously");
        setDb(firestoreDb); // Set Firestore instance
        setStorage(storageInstance); // Save storage to state
        setAuthUser(result.user); // Set the authenticated user
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
      });
  }, []);

  // Use NetInfo to detect network connectivity
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected !== null) {
      setIsConnected(netInfo.isConnected); // Update the connection status
      if (!netInfo.isConnected) {
        // If disconnected, show alert
        Alert.alert(
          "Connection Lost",
          "You have lost your connection to the internet."
        );
      }
    }
  }, [netInfo]); // Trigger this whenever network connectivity changes

  // Disable Firestore when there's no connection
  useEffect(() => {
    if (db) {
      if (isConnected) {
        // Enable Firestore network when connected
        enableNetwork(db).catch((error) =>
          console.error("Error enabling network:", error)
        );
      } else {
        // Disable Firestore network when disconnected
        disableNetwork(db).catch((error) =>
          console.error("Error disabling network:", error)
        );
      }
    }
  }, [isConnected, db]); // Ensure that Firestore is enabled or disabled only after `db` is initialized

  // Show loading screen until db and authUser are ready
  if (!db || !authUser || !storage) {
    return <Start />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              {...props}
              db={db}
              storage={storage} // pass storage prop
              userID={authUser.uid}
              userName={authUser.displayName || "Anonymous"}
              isConnected={isConnected} // Pass connection status to Chat
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
