import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Pressable } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();


//Throws undefined function.
const db=SQLite.openDatabase({
	name:'CoinIt.db', 
	location:'default',
  });

export default function PinScreen({ navigation }) {
	const[pin, setPin] = useState('');
	const[users,setUsers]=useState('');
	const[message,setMessage]=useState("");	var fancypin = '#####';
	const numberpress = (e) => {
		if (Number.isInteger(e)) {
			
		} else if ((e = 'delete')) {

		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<Text>{fancypin}</Text>
			<View>
				<Text>Pin</Text>
				<View style={styles.container[{ flexDirection: 'column' }]}>
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.pinButton}
							onPress={() => numberpress(7)}>
							<Text style={styles.pinText}>7</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="8"
							onPress={() => numberpress(8)}>
							<Text style={styles.pinText}>8</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="9"
							onPress={() => numberpress(9)}>
							<Text style={styles.pinText}>9</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.pinButton}
							title="4"
							onPress={() => numberpress(4)}>
							<Text style={styles.pinText}>4</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="5"
							onPress={() => numberpress(5)}>
							<Text style={styles.pinText}>5</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="6"
							onPress={() => numberpress(6)}>
							<Text style={styles.pinText}>6</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.pinButton}
							title="1"
							onPress={() => numberpress(1)}>
							<Text style={styles.pinText}>1</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="2"
							onPress={() => numberpress(2)}>
							<Text style={styles.pinText}>2</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="3"
							onPress={() => numberpress(3)}>
							<Text style={styles.pinText}>3</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.pinButton}
							title="<"
							onPress={() => numberpress('delete')}>
							<MaterialCommunityIcons size={20} color="white" name="backspace-outline"/>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="0"
							onPress={() => numberpress(0)}>
							<Text style={styles.pinText}>0</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.pinButton}
							title="="
							onPress={() => navigation.navigate('CoinIt - Home')}>
							<Text style={styles.pinText}>=</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}
