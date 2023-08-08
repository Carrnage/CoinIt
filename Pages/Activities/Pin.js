import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button, TextInput } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";

export default function PinScreen({ navigation }) {
  const [pin, setPin] = useState([
    { pos: 1, digit: null },
    { pos: 2, digit: null },
    { pos: 3, digit: null },
    { pos: 4, digit: null },
    { pos: 5, digit: null },
  ]);
  const [position, setPosition] =useState(1)
  var fancypin = "#####";
  const numberpress = (e) => {
    if (Number.isInteger(e)) {
      var currentpin = pin.find((pinpos) => {
        return pinpos.pos === position;
      });
      currentpin.digit = e
      setPin(pin.map((pin) => pin.pos === position ? {...pin, digit: e} : pin))
      var newPosition = position
      newPosition ++
      setPosition(position<5 ? newPosition : position)
      console.log(pin)
      console.log(newPosition)
      console.log(position)
    } else if(e='delete'){
      var currentpin = pin.find((pinpos) => {
        return pinpos.pos === position;
      });
      currentpin = e
      setPin(pin.map((pin) => pin.pos === position ? {...pin, digit: null} : pin))
      var newPosition = position
      newPosition --
      setPosition(position>1 ? newPosition : position)
      console.log(pin)
      console.log(position)
    }
  };
/*
*/
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <Text>{fancypin}</Text>
      <View>
        <Text>Pin</Text>
        <View style={styles.button[{ flexDirection: "column" }]}>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="7" onPress={() => numberpress(7)} />
            <Button title="8" onPress={() => numberpress(8)} />
            <Button title="9" onPress={() => numberpress(9)} />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="4" onPress={() => numberpress(4)} />
            <Button title="5" onPress={() => numberpress(5)} />
            <Button title="6" onPress={() => numberpress(6)} />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="1" onPress={() => numberpress(1)} />
            <Button title="2" onPress={() => numberpress(2)} />
            <Button title="3" onPress={() => numberpress(3)} />
          </View>
          <View style={[{ flexDirection: "row" }]}>
            <Button title="<" onPress={() => numberpress("delete")} />
            <Button title="0" onPress={() => numberpress(0)} />
            <Button
              title="="
              onPress={() => navigation.navigate("CoinIt - Home")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
