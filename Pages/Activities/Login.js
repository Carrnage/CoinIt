import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text, TextInput, View, Button,Alert } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState, useEffect } from 'react';
import {openDatabase} from 'expo-sqlite';


const Stack = createNativeStackNavigator();



export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isUser, setIsUser] = useState(false);
	const [message, setMessage] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [pinNumber,setPinNumber]=useState('');
	const [phone, setPhone] = useState('');
	const [street,setStreet] = useState('');
	const [suburb,setSuburb]=useState('');
	const [city,setCity] = useState('');
	const [state,setState]= useState('');
	const [country,setCountry]=useState('');
	const [postalCode,setPostalCode]=useState('');
	const [users,setUsers] = useState([]);
	var isSeedData=0;

	const db = openDatabase('CoinIt.db',
	(sqlTnx, reg) => console.log('Database has been created successful'),
	(sqlTnx,error) => console.log('Error in creating database' + error.message),
	);

	const createUserTable =  () => {
		 db.transaction( tx => {
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
			);});
			db.transaction(tx=>
				tx.executeSql('insert into Users (FirstName,LastName,Gender,Email,Password,Pin,Phone,Street,Suburb,City,State,Country,PostalCode) '+
				'values ("Greg","Han","Male","greg@user.com","Greg12345","12345","213434","123 Eye Street","Invercargill", '+
				'"Invercargill","Southland","New Zealand","9812" )',null,
				(sqlTnx,reg)=>console.log(`${firstName} has been added successful`),
				(sqlTnx,error)=>console.log('error on adding a user ' + error.message),
				),);

			db.transaction(tx=>	
				tx.executeSql('insert into Users (FirstName,LastName,Gender,Email,Password,Pin,Phone,Street,Suburb,City,State,Country,PostalCode) '+
				 'values ("Kevin","Young","Male","kevin@user.com","Kevin12345","12345","213437","133 Don Street","Invercargill", '+
				 '"Invercargill","Southland","New Zealand","9812" )',null,
				 (sqlTnx,reg)=>console.log(`${firstName} has been added successful`),
				 (sqlTnx,error)=>console.log('error on adding a user ' + error.message),
				 ),);

			db.transaction(tx=>
				 tx.executeSql('insert into Users (FirstName,LastName,Gender,Email,Password,Pin,Phone,Street,Suburb,City,State,Country,PostalCode) '+
				 'values ("Quintin","Carl","Male","quintin@user.com","Quintin12345","12345","213457","133 Eccle Street","Groe", '+
				 '"Invercargill","Southland","New Zealand","9812" )',null,
				 (sqlTnx,reg)=>console.log(`${firstName} has been added successful`),
				 (sqlTnx,error)=>console.log('error on adding a user ' + error.message),
				 ), );
		};

	const createPassDataTable = () =>{
         db.transaction(tx=>{
			tx.executeSql('CREATE TABLE IF NOT EXISTS PassData (id INTEGER PRIMARY KEY AUTOINCREMENT, Email Text, Pin Text)',null,
			(sqlTnx,reg)=>console.log('The Pass Date table has been created.'),
			(sqlTnx,error)=>console.log(error),
			); });
	};

   const AddPin =(email,pinNumber) =>{
	   db.transaction(tx=>{
		tx.executeSql('insert into PassData (Email,Pin), vlaues(?,?)',[email],[pinNumber],
		(sqlTnx,reg)=>console.log("A new recorde has been inserted"),
		(sqlTnx,error)=>console.log(error),);
	   });
   }


	const getUserData = () => {
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM Users', null,
			(txObj,resultSet)=>setUsers(resultSet.rows._array),
			(txObj,error)=>console.log(error),
	         )},);
		};

		useEffect(() => {			
		    if(isSeedData<1){
				createUserTable();
				createPassDataTable();	
			};
			isSeedData = 2;						
		}, []);
		
	const handleLogin = () => {		
		
		if (email != null && password != null) {	
			getUserData();
			const user = users.filter(u => u.Email === email && u.Password === password)
			if (user.length>0) {
				console.log(user[0].FirstName, user[0].Pin);
				AddPin(user[0].Email,user[0].pinNumber);
				navigation.navigate('CoinIt - Pin');			
			} else {
				Alert.alert('Invalid username or password. Please logon!');
				setEmail('');
				setPassword('');
				//navigation.navigate('CoinIt-Login');
			}
		} else {
			Alert.alert("Please enter a Email and Password");
			setEmail('');
			setPassword('');
			//navigation.navigate('CoinIt-Login');
		}
	};

	const showUsers = () =>{
         return users.map((user,index)=>{
			return (
				<View style={styles.row} key={index}>
					<Text>{user.FirstName}</Text>
					<Text>{user.Paassword}</Text>
				</View>
			);});
	};

const debug = async ()=> {
		     console.log("debug log in if seen outside test build PANIC");
			 setEmail('')
			 setPassword('')
		     navigation.navigate("CoinIt - Pin");
}
const registerPress = async () => {
	navigation.navigate('CoinIT - Registration');
};
const TESTPAGE = async () => {
	navigation.navigate("CoinIt - TESTPAGE");
};

	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>CoinIt</Text>
				<Button style={styles.button} title='TESTPAGE' onPress={TESTPAGE}><Text>TESTPAGE</Text></Button>
			</View>
			<StatusBar style="auto" />
			<View style={styles.containerColumn}>
				<Text style={styles.text}>Email</Text>
				<TextInput
					style={styles.textInput}
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					onChangeText={setEmail}
					value={email}
				/>
				<Text style={styles.spacer}>Password</Text>
				<TextInput
					style={styles.textInput}
					textContentType="password"
					secureTextEntry={true}
					enterKeyHint="enter"
					onChangeText={setPassword}
					value={password}
				/>
				<View style={styles.spacer} />
				<Pressable
					style={styles.button}
					onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={registerPress}>
					<Text style={styles.buttonText}>Register</Text>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={debug}><Text style={styles.buttonText}>DEBUG</Text></Pressable>
			</View>	
			{showUsers()}		
		</View>
	);
}
