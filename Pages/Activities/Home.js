import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { styles } from "../../Stylesheets/AppStyle";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Home</Text>
        <Button title='Receive'
        onPress={()=> navigation.navigate('Receive')}/>
        <Button title='Send'
        onPress={()=> navigation.navigate('Send')}/>

      </View>
    </View>
  );
}
