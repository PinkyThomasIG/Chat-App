//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//create the navigator

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start" // set the initial screen to start
      >
        <Stack.Screen
          name="Start"
          component={Start} // link the start screen to the 'Start' rooute
        />
        <Stack.Screen
          name="Chat"
          component={Chat} // link the chat screen to 'chat route
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
