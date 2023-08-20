import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType, BarCodeSettings } from "expo-camera";

const Stack = createNativeStackNavigator();

export default function ReceiveScreen() {
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [paymentStatus, setPaymentStatus] = useState({
    id: "ConfirmResponse",
    payment_id: 0,
    personal_email: "default",
    merchant_email: "default",
    amount: 0,
    message: "default",
  });
  const [paymentConfirm, setPaymentConfirm] = useState({
    id: "dunno, workshop it",
    payment_id: 0,
    confirm: false,
  });
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <View>
          <Camera
            style={styles.camera}
            type={type}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <View style={styles.container}>
          <Text>{paymentStatus.personal_email}</Text>
          <Text>{paymentStatus.merchant_email}</Text>
          <Text>{paymentStatus.amount}</Text>
          <Text>{paymentStatus.message}</Text>
          <Button title="Confirm" />
          <Button title="Decline" />
        </View>
      </View>
    </View>
  );
}
