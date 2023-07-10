import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyle";

const Stack = createNativeStackNavigator();


export default function LoginScreen({navigation}) {
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
        />
        <Text>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          enterKeyHint="enter"
        />
        <Button title='Login'
        onPress={()=> navigation.navigate('Pin')}/>
      </View>
    </View>
  );
}
