import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";
import { styles } from "../../Stylesheets/AppStyle";

export default function PinScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Pin</Text>
        <Button title='submit'
        onPress={()=> navigation.navigate('Home')}/>
      </View>
    </View>
  );
}
