import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";

const Stack = createNativeStackNavigator();


export default function ReceiveScreen() {
  const [paymentStatus, setPaymentStatus] = useState({
    id: "ConfirmResponse",
    payment_id: 0,
    personal_email: "default",
    merchant_email: "default",
    amount: 0,
    message: "default",
  })
  const [paymentConfirm, setPaymentConfirm] = useState({
    id: "dunno, workshop it",
    payment_id: 0,
    confirm: false
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>{paymentStatus.personal_email}</Text>
        <Text>{paymentStatus.merchant_email}</Text>
        <Text>{paymentStatus.amount}</Text>
        <Text>{paymentStatus.message}</Text>
        <Button>Confirm</Button>
        <Button>Decline</Button>
      </View>
    </View>
  );
}
