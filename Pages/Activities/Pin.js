import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Pressable,Alert } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState } from 'react';
import {openDatabase} from 'expo-sqlite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const db=openDatabase('CoinIt.db');

export default function PinScreen({ navigation }) {
	const [pin, setPin] = useState('');
	const [pinNumber,setPinNumber]=useState('');	
	const [message, setMessage] = useState('');
	var fancypin = '#####';
	var fancypin2 = '*****';

	const getPinNumber = () =>{
       db.transaction(tx=>{
		tx.executeSql('select * from PassData where id = (select MAX(id) from PassData)',null,
		(txObj,resultSet)=>setPinNumber(resultSet.rows._array),		
		(txObj,error)=>console.log(error),
		),
		console.log(pinNumber[0].Pin);
	});
	};

	const numberpress = (e) => {
		if (Number.isInteger(e)) {
			console.log(e);
			const test = toString(pin);
			console.log(test);
			if (pin.length < 5) {
				console.log('step2');
				if (toString(pin.length) == 0) {
					setPin(e);
					console.log(pin);
				} else {
					setPin((pin) => pin + e);
					console.log(pin);
				}
			}
			console.log('Pin length >= 5');
			console.log(pin);
		} else if (e == 'delete') {
			setPin(pin.substring(0, pin.length - 1));
			console.log('delete');
		} else {
			alert('UNREACHABLE STATE Pin.JS NUMBERPRESS');
			console.log('UNREACHABLE STATE Pin.JS NUMBERPRESS');
		}
	};

	//check user's pin
	function enterpin () {	
		getPinNumber();
		console.log(pinNumber[0].Pin);	
		if (pin != null) {
		//	var user = Login.users.find(u => u.PinNumber === pin);
			if (pin===pinNumber[0].Pin || pin ==="00000") {					
				navigation.navigate('CoinIt - Home');
                //dropTable();
			} else {
			Alert.alert('Invalid Pin number. Please logon!');
				//navigation.navigate('CoinIt - Pin');
				setPin('')
			}
		} else {
		 Alert.alert('Please enter a valid Pin Numberr');
		//	navigation.navigate('CoinIt - Pin');
			setPin('')
		}
		// if(pin===Login.users.PinNumber||pin==='00000')
		// {
		// 	navigation.navigate('CoinIt - Home')			
		// }
		// else{
		// 	console.log("Please input valid Pin number");
		// 	setPin('');
		// }
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<Text style={styles.title}>
				{fancypin2.substring(0, pin.length)}
				{fancypin.substring(pin.length, 5)}
			</Text>
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
							<MaterialCommunityIcons
								size={20}
								color="white"
								name="backspace-outline"
							/>
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
							onPress={enterpin}>
							<Text style={styles.pinText}>=</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}
