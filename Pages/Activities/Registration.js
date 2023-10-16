import React from 'react';
import { styles } from '../../Stylesheets/AppStyleLight';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	Button,
	Pressable,
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabase(
	{
		name: 'CoinIt.db',
		location: 'default',
	},
	(sqlTnx, reg) => {
		console.log('Table has been created successful');
	},
	(error) => {
		console.log('Error in creating database' + error.message);
	}
);

export default function RegistrationScreen({ navigation }) {
	const [userID, setUserID] = useState(1);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [account, setAccount] = useState('');

	useEffect(() => {
		createUserTable();
	}, []);

	const createUserTable = async () => {
		await db.transaction(async (tx) => {
			await tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'Users ' +
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName varchar(20), LastName varchar(20), Email varchar(30),' +
					'Password varchar(15), Phone varchar(11), Account varchar(15))',
				[],
				(sqlTnx, reg) => {
					console.log('Table has been created successful');
				},
				(error) => {
					console.log('Error in creating table' + error.message);
				}
			);
		});
	};

	const AddUsers = () => {
		if (
			firstName.length == 0 ||
			lastName.length == 0 ||
			gender.length == 0 ||
			email.length == 0 ||
			password.length == 0 ||
			phone.length == 0 ||
			account.length == 0
		) {
			alert('Please input valid user information!');
			return false;
		}
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO Users (FirstName, LastName, Email, Password, Phone, Account) VALUES (?,?,?,?,?,?)',
				[firstName, lastName, gender, email, password, phone, account]
			);
			(sqlTnx, reg) => {
				console.log('${firstName} has been added successful');
				getFirstName();
				setFirstName('');
			},
				(error) => {
					console.log('error on adding a user ' + error.message);
				};
		});
	};
	const Cancel = async () => {
		navigation.navigate('CoinIt - Login');
	};

	return (
		<ScrollView Style={styles.containerScroll}>
			<Text style={styles.title}>Registration</Text>
			<View style={styles.container}>
				<Text style={styles.text}>ID</Text>
				<TextInput
					disabled={true}
					style={styles.textInput}
					placeholder=""
					value={userID}
					onChangeText={setUserID}
				/>
				<Text style={styles.text}>First Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your FirstName"
					value={firstName}
					onChangeText={setFirstName}
				/>
				<Text style={styles.text}>Last Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your LastName"
					value={lastName}
					onChangeText={setLastName}
				/>
				<Text style={styles.text}>Gender</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your Gender"
					value={gender}
					onChangeText={setGender}
				/>
				<Text style={styles.text}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
				/>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
				<Text style={styles.text}>Phone Number</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your Phone"
					value={phone}
					onChangeText={setPhone}
				/>
				<Text style={styles.text}>Account</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your Account"
					value={account}
					onChangeText={setAccount}
				/>
				<Pressable
					title="Register"
					onPress={AddUsers}
					style={styles.button}>
					<Text style={styles.buttonText}>Register</Text>
				</Pressable>
				<Pressable
					onPress={Cancel}
					style={styles.button}>
					<Text style={styles.buttonText}>Cancel</Text>
				</Pressable>
			</View>
		</ScrollView>
	);
}
