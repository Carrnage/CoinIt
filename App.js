import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/Activities/Login";
import PinScreen from "./Pages/Activities/Pin";
import HomeScreen from "./Pages/Activities/Home";
import SendScreen from "./Pages/Activities/Send";
import ReceiveScreen from "./Pages/Activities/Receive";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          Options={{ title: "test" }}
        />
        <Stack.Screen name="Pin" component={PinScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
        <Stack.Screen name="Receive" component={Receive} />
*/