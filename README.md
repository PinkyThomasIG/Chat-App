# React Native Mobile Chat App

A mobile chat application built with React Native and Expo that allows users to enter a chat room, send messages, images, and share their location.

## Features

Personalized UI - Choose your chat background image for a customized experience
Real-time Chat - Exchange messages with friends and family instantly
Image Sharing - Send photos from your camera or library
Location Sharing - Let others know where you are with a tap
Offline Access - Read your conversations even without internet connection

## Technologies used

### Frontend

- **React Native**: Core framework
- **Expo** Development platform
- **React Navigation** Navigation between screens
- **Expo Image Picker** Camera and image library access
- **Expo Location** Location services
- **React Native Maps** Map display for location sharing

### Backend & Storage

- **Google Firestore Database** Real-time message storage
- **Google Firebase Authentication** Anonymous user authentication
- **Firebase Cloud Storage** Storage for images
- **AsyncStorage** Offline data persistence

### Prerequisites

Make sure you have the following installed:

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for physical device testing)
- Android Studio (for Android Emulator)
- Firebase Account

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/PinkyThomasIG/Chat-App.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chat-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Firebase Setup:
   Create a Firebase project at firebase.google.com
   Enable Firestore Database
   Enable Firebase Authentication (Anonymous)
   Enable Firebase Storage
   Set Storage security rules to allow authenticated reads and writes:

```bash
  rules_version = '2';
service firebase.storage {
 match /b/{bucket}/o {
   match /{allPaths=**} {
     allow read, write: if request.auth != null;
   }
 }
}
```

Get your Firebase configuration details (apiKey, authDomain, etc.)
Update the Firebase configuration in App.js with your values

```bash
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID"
};
```

5. Install required dependencies:

```bash
   expo install @react-navigation/native @react-navigation/native-stack
expo install @react-native-async-storage/async-storage
expo install @react-native-community/netinfo
expo install expo-image-picker
expo install expo-location
expo install react-native-maps
expo install @expo/react-native-action-sheet
npm install firebase
```

6. Start the Expo development server:

```bash
   npx expo start
```

7. Run on your preferred platform:

```bash
   Scan the QR code with Expo Go (Android) or Camera app (iOS)
   Press 'a' to launch on Android Emulator
   Press 'i' to launch on iOS Simulator (Mac only)
```
