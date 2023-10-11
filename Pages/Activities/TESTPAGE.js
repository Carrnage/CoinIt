import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();


export default function TESTPAGE1({ navigation }) {
    return (
        <View><Text>Hello world</Text></View>
    )
}