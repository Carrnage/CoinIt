import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SectionList, Text, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";
import { TextInput } from "react-native-paper";

export default function SendScreen() {
  const [paymentRequest, setPaymentRequest] = useState({
    id: "Payment Request",
    personal_email: "default",
    merchant_email: "default",
    amount: 0,
    payment_method: "default",
    status: 1,
  });
  const [paymentResponse, setPaymentResponse] = useState({
    message: "default",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Personal email</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
        />
        <Text>Merchant Email</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          onChange={(setEmail) =>
            setPaymentRequest((paymentRequest) => ({
              ...paymentRequest,
              merchant_email: setEmail.target.value,
            }))
          }
        />
        <Text>Amount</Text>
        <TextInput keyboardType="decimal-pad" inputMode="decimal" />
        <Text>Send</Text>
      </View>
    </View>
  );
}
