//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// initialize Firebase and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import React, { useState, useEffect } from "react";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8OAbcuS-Pk-NPEW6UEY3-1nmCMOwI-9Q",
  authDomain: "chatapp-7c125.firebaseapp.com",
  projectId: "chatapp-7c125",
  storageBucket: "chatapp-7c125.firebasestorage.app",
  messagingSenderId: "835969299500",
  appId: "1:835969299500:web:64d12f916f278fcc9e8d89",
};

//create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // State to store the db (Firestore) object
  const [db, setDb] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  // Initialize Firebase, Firestore, and Auth
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);
    const auth = getAuth(app);

    // Sign in anonymously
    signInAnonymously(auth)
      .then((result) => {
        console.log("Signed in anonymously");
        setDb(firestoreDb); // Set Firestore instance
        setAuthUser(result.user); // Set the authenticated user
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
      });
  }, []);

  // Show loading screen until db is ready
  if (!db || !authUser) {
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
              userID={authUser.uid}
              userName={authUser.displayName || "Anonymous"}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
