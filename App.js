import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/Activities/Login";
import RegistrationScreen from "./Pages/Activities/Registration";
import PinScreen from "./Pages/Activities/Pin";
import HomeScreen from "./Pages/Activities/Home";
import SendScreen from "./Pages/Activities/Send";
import ReceiveScreen from "./Pages/Activities/Receive";
import TESTPAGE1 from "./Pages/Activities/TESTPAGE";
import StripeApp from "./Pages/Activities/StripeApp";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TransactionHistory from "./Pages/Activities/History";
import { StripeProvider,useStripe,PaymentElement } from "@stripe/stripe-react-native";

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
        name="CoinIt - Stripe"
        component={StripeApp}
        options={{
          tabBarLabel: "Stripe",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="arrow-down-bold"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
	// const [publishableKey,setPublishableKey]= useState('');
	// const [secretKey,setSecretKey]=useState('');


  // useStripe({
  //   apiKey: "YOUR_API_KEY",
  //   })
  //   .then((stripe) => {
  //     setPublishableKey(stripe.publishableKey);
  //     setSecretKey(stripe.secretKey);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (

    <NavigationContainer>          
      <Stack.Navigator>
       
        <Stack.Screen name="CoinIt - Login" component={LoginScreen} />
        <Stack.Screen name="CoinIT - Registration" component={RegistrationScreen} />
        <Stack.Screen name="CoinIt - Pin" component={PinScreen} />
        <Stack.Screen name="CoinIt - Home" component={Hometabs} />
        <Stack.Screen name="CoinIt - TESTPAGE" component={TESTPAGE1} />        
        <Stack.Screen name="CoinIt - StripeApp" component={StripeApp} />  
        <Stack.Screen name="CoinIt - Transactions" component={TransactionHistory} />    
       
      </Stack.Navigator>  
      
    </NavigationContainer>

  );
}
/*
*/