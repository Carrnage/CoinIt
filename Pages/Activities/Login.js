import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Pressable, Text, TextInput, View } from "react-native";
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
        break;
      default:
        console.log("login failed try to debug")
        break;
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View >
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
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
        <Text style={{fontSize:'large'}}>Password</Text>
        <TextInput
          style={styles.textInput}
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
        <View style={styles.spacer}/>
        <Pressable
          style={styles.button}
          onPress={sendLogin}
        ><Text style={styles.buttonText}>Login</Text></Pressable>
      </View>
    </View>
  );
}
