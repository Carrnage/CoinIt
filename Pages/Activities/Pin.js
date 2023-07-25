import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button, TextInput } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";

export default function PinScreen({ navigation }) {
  const [pin,setPin] = useState('00000');
  const [pos,setPos] = useState('1')

  const numberpress=e=> {
    const title =e.target; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <Text>#####</Text>
      <View>
        <Text>Pin</Text>
        <View style={styles.button[{ flexDirection: "column" }]}>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="7" />
            <Button title="8" />
            <Button title="9" />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="4" />
            <Button title="5" />
            <Button title="6" />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="1" />
            <Button title="2" />
            <Button title="3" />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="<" />
            <Button title="0" />
            <Button title="=" onPress={() => navigation.navigate("CoinIt - Home")} />
          </View>
        </View>
      </View>
    </View>
  );
}
