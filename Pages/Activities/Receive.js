import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyle";

const Stack = createNativeStackNavigator();


export default function ReceiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Receive</Text>
      </View>
    </View>
  );
}
