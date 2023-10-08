import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button, TextInput, Pressable } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState } from 'react';

export default function PinScreen({ navigation }) {
	const [pin, setPin] = useState([
		{ pos: 1, digit: null },
		{ pos: 2, digit: null },
		{ pos: 3, digit: null },
		{ pos: 4, digit: null },
		{ pos: 5, digit: null },
	]);
	const [position, setPosition] = useState(1);
	var fancypin = '#####';
	const numberpress = (e) => {
		if (Number.isInteger(e)) {
			var currentpin = pin.find((pinpos) => {
				return pinpos.pos === position;
			});
			currentpin.digit = e;
			setPin(
				pin.map((pin) => (pin.pos === position ? { ...pin, digit: e } : pin))
			);
			var newPosition = position;
			newPosition++;
			setPosition(position < 5 ? newPosition : position);
			console.log(pin);
			console.log(newPosition);
			console.log(position);
		} else if ((e = 'delete')) {
			var currentpin = pin.find((pinpos) => {
				return pinpos.pos === position;
			});
			currentpin = e;
			setPin(
				pin.map((pin) => (pin.pos === position ? { ...pin, digit: null } : pin))
			);
			var newPosition = position;
			newPosition--;
			setPosition(position > 1 ? newPosition : position);
			console.log(pin);
			console.log(position);
		}
	};
	/*
	 */
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<Text>{fancypin}</Text>
			<View>
				<Text>Pin</Text>
				<View style={styles.button[{ flexDirection: 'column' }]}>
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.button}
							onPress={() => numberpress(7)}>
							<Text style={styles.buttonText}>7</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="8"
							onPress={() => numberpress(8)}>
							<Text style={styles.buttonText}>8</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="9"
							onPress={() => numberpress(9)}>
							<Text style={styles.buttonText}>9</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.button}
							title="4"
							onPress={() => numberpress(4)}>
							<Text style={styles.buttonText}>4</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="5"
							onPress={() => numberpress(5)}>
							<Text style={styles.buttonText}>5</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="6"
							onPress={() => numberpress(6)}>
							<Text style={styles.buttonText}>6</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.button}
							title="1"
							onPress={() => numberpress(1)}>
							<Text style={styles.buttonText}>1</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="2"
							onPress={() => numberpress(2)}>
							<Text style={styles.buttonText}>2</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="3"
							onPress={() => numberpress(3)}>
							<Text style={styles.buttonText}>3</Text>
						</Pressable>
					</View>
					<View style={styles.spacer} />
					<View style={[{ flexDirection: 'row' }]}>
						<Pressable
							style={styles.button}
							title="<"
							onPress={() => numberpress('delete')}>
							<Text style={styles.buttonText}>d</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="0"
							onPress={() => numberpress(0)}>
							<Text style={styles.buttonText}>0</Text>
						</Pressable>
						<View style={styles.spacer} />
						<Pressable
							style={styles.button}
							title="="
							onPress={() => navigation.navigate('CoinIt - Home')}>
							<Text style={styles.buttonText}>=</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}
