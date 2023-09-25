import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/Activities/Login";
import PinScreen from "./Pages/Activities/Pin";
import HomeScreen from "./Pages/Activities/Home";
import SendScreen from "./Pages/Activities/Send";
import ReceiveScreen from "./Pages/Activities/Receive";
import {Registration} from "./Pages/Activities/Registration";
import {PaymentRoutes} from "./Pages/Activities/PaymentRoutes";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Hometabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="CoinIt - Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Coinit - Send"
        component={SendScreen}
        options={{
          tabBarLabel: "Send",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-up-bold"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CoinIt - Receive"
        component={ReceiveScreen}
        options={{
          tabBarLabel: "Receive",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-down-bold"
              color={color}
              size={26}
            />
          ),
        }}
      />

       <Tab.Screen
        name="CoinIt - Registration"
        component={Registration}
        options={{
          tabBarLabel: "Registration",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-down-bold"
              color={color}
              size={26}
        />
          ),}}
        />

<Tab.Screen
        name="CoinIt - PaymentRoutes"
        component={PaymentRoutes}
        options={{
          tabBarLabel: "Payment",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-down-bold"
              color={color}
              size={26}
        />
          ),}}
        />



    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51NtqGXCWBcyMptLjOUgDhCAcm8pQG8oz66xblt2IDx7qPIxRaUnoZrN1e4g2CDRFqivXmjOP6JIMcdkLVc9Hzg7c00JU0bZ5ak">
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoinIt - Login" component={LoginScreen} />
        <Stack.Screen name="CoinIt - Pin" component={PinScreen} />
        <Stack.Screen name="CoinIt - Home" component={Hometabs} />
        <Stack.Screen name="CoinIt - Payment" component={PaymentRoutes} />
        <Stack.Screen name="CoinIt - Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
  );
}
/*


*/
