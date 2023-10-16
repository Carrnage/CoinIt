import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, TextInput, View } from 'react-native';

const Stack = createNativeStackNavigator();

//            {this.state.rows.map((row => <Text key={row.id}></Text>))}


export default function TransactionHistory({ navigation }) {
    return (
        <View>
            <Text>Placeholder</Text>
        </View>
    )
}