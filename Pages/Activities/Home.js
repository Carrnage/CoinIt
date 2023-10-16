import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../../Stylesheets/AppStyleLight';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen({ navigation }) {
	const [transaction, setTransaction] = useState('~');
  function historyredirect() {
    {navigation.navigate('CoinIt - Transactions')}
  }

	return (
		<View style={[{ flexDirection: 'column' }, styles.container]}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<View>
				<Text>Home</Text>
			</View>
			<View style={styles.titleBox}>
				<Text>Transaction History</Text>
				<Pressable
					style={styles.button}
					onPress={historyredirect}>
					<Text style={styles.buttonText}>{transaction}</Text>
				</Pressable>
			</View>
		</View>
	);
}
