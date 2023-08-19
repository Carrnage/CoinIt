import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function LoginScreen({ navigation }) {
  const [loginDTO, setLoginDTO] = useState({
    id: "AuthRequest",
    email: "default",
    password: "default",
  });
  function sendLogin() {
    console.log(loginDTO);
    switch(loginDTO.email){
      case 'debug':
        console.log("debug log in if seen outside test build PANIC");
        navigation.navigate("CoinIt - Pin");
      default:
        console.log("login failed try to debug")
        break;
    }
  }
  return (
    <View style={[{flexDirection:'column'},styles.container]}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Email</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          onChangeText={(setEmail) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              email: setEmail,
            }))
          }
        />
        <Text>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          enterKeyHint="enter"
          onChangeText={(setPassword) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              password: setPassword,
            }))
          }
        />
        <Button
          title="Login"
          onPress={sendLogin}
        />
      </View>
    </View>
  );
}
