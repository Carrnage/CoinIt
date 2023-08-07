import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, SectionList, Text, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

export default function SendScreen() {
  const [paymentRequest, setPaymentRequest] = useState({
    id: "Payment Request",
    personal_email: "default",
    merchant_email: "default",
    amount: 0,
    payment_method: "default",
    status: 0,
  });
  const [paymentResponse, setPaymentResponse] = useState({
    message: "default",
  });
  function onSend() {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        {paymentRequest.status > 0 &&
        <QRCode
          value="{paymentRequest}"
        />}
        <Text>Personal email</Text>
        <TextInput
          disabled="true"
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          defaultValue={paymentRequest.personal_email}
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
        <Button title="Send" onPress={(setStatus) => setPaymentRequest((paymentRequest) => ({
          ...paymentRequest,
          status: setStatus=1
        }))}/>
      </View>
    </View>
  );
}
