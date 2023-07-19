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
    navigation.navigate("Pin");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Email</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          onChange={(setEmail) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              email: setEmail.target.value,
            }))
          }
        />
        <Text>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          enterKeyHint="enter"
          onChange={(setPassword) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              password: setPassword.target.value,
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
