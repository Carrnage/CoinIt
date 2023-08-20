import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, SectionList, Text, View, TextInput } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";

import QRCode from "react-native-qrcode-svg";

export default function SendScreen() {
  const [paymentRequest, setPaymentRequest] = useState({
    id: "Payment Request",
    personal_email: "default",
    merchant_email: "default",
    amount: 0.0,
    payment_method: "default",
    status: 0,
  });
  const [qrcode, setqrcode] = useState(
    JSON.stringify(paymentRequest)
  );
  const [paymentResponse, setPaymentResponse] = useState({
    message: "default",
  });
  function onSend() {
    setqrcode(
      JSON.stringify(paymentRequest)
    ),
      setPaymentRequest((paymentRequest) => ({
        ...paymentRequest,
        status: 1,
      }));
    console.log(qrcode);
    console.log(paymentRequest);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        {paymentRequest.status > 0 && <QRCode value={qrcode} />}
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
          onChangeText={(setEmail) =>
            setPaymentRequest((paymentRequest) => ({
              ...paymentRequest,
              merchant_email: setEmail,
            }))
          }
        />
        <Text>Amount</Text>
        <TextInput
          keyboardType="decimal-pad"
          inputMode="decimal"
          onChangeText={(newAmount) =>
            setPaymentRequest((paymentRequest) => ({
              ...paymentRequest,
              amount: newAmount,
            }))
          }
        />
        <Button title="Send" onPress={onSend} />
      </View>
    </View>
  );
}
