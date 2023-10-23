import React from 'react';
import { styles } from '../../Stylesheets/AppStyleLight';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import {AppStyleLight} from '../../Stylesheets/AppStyleLight';
import {
	Text,
	View,
	ScrollView,
	TextInput,
	Button,
	Pressable,
} from 'react-native';
import {openDatabase} from 'expo-sqlite';

const Stack = createNativeStackNavigator();

const db = openDatabase('CoinIt.db',
	(sqlTnx, reg) => console.log('Database has been created successful'),
	(sqlTnx,error) => console.log('Error in creating database' + error.message),	
);

export default function RegistrationScreen({ navigation }) {
   // const [id,setId]= useState();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pinNumber,setPinNumber]=useState('');
	const [phone, setPhone] = useState('');
	const [street,setStreet] = useState('');
	const [suburb,setSuburb]=useState('');
	const [city,setCity] = useState('');
	const [state,setState]= useState('');
	const [country,setCountry]=useState('');
	const [postalCode,setPostalCode]=useState('');
	const [users,setUsers] = useState([]);

	useEffect(() => {
		createUserTable();
	}, []);

	const createUserTable = () => {
		 db.transaction((tx) => {
			 tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' +
					'Users ' +
					'(id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName Text, LastName Text, Gender Text, '+
					'Email Text, Password Text, Pin Text, Phone Text, Street Text, Suburb Text, City Text, '+
					'State Text, Country Text, PostalCode Text)',
				null,
				(sqlTnx, reg) => {
					console.log('Table has been created successful');
				},
				(txObj,error) => console.log('Error in creating table' + error.message),
			);
		});
    };

	const getData = () =>{
      db.transaction(tx=>{
		tx.executeSql('select * from Users',null,
		(txObj,resultSet)=>setUsers(resultSet.rows._array),
		(txObj,error)=>console.log(error),
		)});
	};

	const deleteUser = (id) => {
		db.transaction(tx => {
		  tx.executeSql('DELETE FROM Users WHERE id = ?', [id],
           (sqlTnx,reg)=>console.log("A recorde has been deleted successful"),
		   (sqlTnx,error)=>console.log(error)
		  );
		});
	  };

	const showUsers=()=>{
		getData();
		return users.map((user,index)=>{
			return(
            <View style={styles.row}>
				<Text>{user.FirstName} {user.LastName}</Text>
				<Text>{user.Email}</Text>
				<Button style={styles.button} title='Delete' onPress={()=>deleteUser(user.id)}/>
			</View>
			);
		});
	}

	const AddUsers = () => {			
		db.transaction((tx) => {
			tx.executeSql(
				'insert into Users (FirstName,LastName,Gender,Email,Password,Pin,Phone,Street,Suburb,City,State,Country,PostalCode) '+
				'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
				[firstName,lastName,gender,email,password,pinNumber,phone,street,suburb,city,state,country,postalCode],
				(sqlTnx, reg) => {
					console.log(`${firstName} has been added successful`);
					setFirstName('');
					setLastName('');
					setGender('');
					setEmail('');
					setPassword('');
					setPinNumber('');
					setStreet('');
					setSuburb('');
					setCity('');
					setCountry('');
					setState('');
					setPhone('');
					setPostalCode('');
				},
					(error) => {
						console.log('error on adding a user ' + error.message);
				},
			);
		});
	};



	const Cancel = async () => {
		navigation.navigate('CoinIt - Login');
	};

	return (
		<ScrollView Style={styles.containerScroll}>
			<Text style={styles.title}>Registration</Text>
			<View style={styles.container}>

				<View style={styles.row}>
				<Text style={styles.text}>First Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your FirstName"
					value={firstName}
					onChangeText={setFirstName}
				/></View>

                <View style={styles.row}>
				<Text style={styles.text}>Last Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your LastName"
					value={lastName}
					onChangeText={setLastName}
				/></View>

				<View style={styles.row}>
				<Text style={styles.text}>Gender</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your Gender"
					value={gender}
					onChangeText={setGender}
				/></View>
				
				<View style={styles.row}>
				<Text style={styles.text}>Email</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your email"
					value={email}
					onChangeText={setEmail}
				/></View>

				<View style={styles.row}>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/></View>

                <View style={styles.row}>
	            <Text style={styles.text}>Pin Number</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='Your Pin Number'
			            value={pinNumber}
			            onChangeText={setPinNumber}
						//secureTextEntry
						/></View>

                <View style={styles.row}>
				<Text style={styles.text}>Phone Number</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter your Phone"
					value={phone}
					onChangeText={setPhone}
				/></View>

                <View style={styles.row}>
	            <Text style={styles.text}>Street</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='Street number and name'
			            value={street}
			            onChangeText={setStreet}/></View>

                <View style={styles.row}>
	            <Text style={styles.text}>Suburb</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='Suburb'
			            value={suburb}
			            onChangeText={setSuburb}/></View>

                <View style={styles.row}>
	            <Text style={styles.text}>City</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='City'
			            value={city}
			            onChangeText={setCity}/></View>

				<View style={styles.row}>
					<Text style={styles.text}>State/Province</Text>
					<TextInput style={styles.textInput}
					    placeholder='State/Province'
						value={state}
						onChangeText={setState}/>
				</View>
				
				<View style={styles.row}>
	            <Text style={styles.text}>Country</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='Country'
			            value={country}
			            onChangeText={setCountry}/></View>
				
				<View style={styles.row}>
	            <Text style={styles.text}>Postal Code</Text>
	            <TextInput style={styles.textInput} 
	                    placeholder='Postal Code'
			            value={postalCode}
			            onChangeText={setPostalCode}/></View>			

               <View style={styles.row}>
				<Button
					title='Register'
					onPress={AddUsers}
					style={styles.button}>				
				</Button>
				<Button
				    title='Cancel'
					onPress={Cancel}
					style={styles.button}>					
				</Button></View>
			</View>
          
			{showUsers()}	  

		</ScrollView>
				
	);
}
