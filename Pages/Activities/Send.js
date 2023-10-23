import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, SectionList, Text, View, TextInput } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState, useEffect,useDate } from 'react';
import { Login } from './Login';
import {openDatabase} from 'expo-sqlite';
import QRCode from 'react-native-qrcode-svg';
//import Stripe from 'react-native-stripe-payments';

const db = openDatabase('CoinIt.db',
	(sqlTnx, reg) => console.log('Database has been created successful'),
	(sqlTnx,error) => console.log('Error in creating database' + error.message),	
);

export default function SendScreen() {

	const [receiverEmail, setReceiverEmail] = useState('');
	const [amount, setAmount] = useState(0);
	const [generateDate, setGenerateDate] = useState(null);
	const [paymentDate, setPaymentDate] = useState(null);
	const [currentDate,setCurrentDate]=useState(null);
	const [currentTime,setCurrentTime]=useState(null);	
	const [paymentResponse, setPaymentResponse] = useState();
    const [stripeIntent,setStripeIntent]=useState('');
	const [collections,setCollections] = useState([]);
	const [isSeedData,setIsSeedData]=useState(false);

	const [paymentRequest, setPaymentRequest] = useState({
		id: 'Payment Request',
		sender_email: 'defaultSender',
		receiver_email: 'defaultReceiver',
		amount: 0.0,
		payment_method: 'default',
		message: 'default',
		status: 0,
	});
	const [qrcode, setqrcode] = useState(JSON.stringify(paymentRequest));

	//create a table named collection
	const createTable=()=> {
		 db.transaction(tx => {
			 tx.executeSql(
				'CREATE TABLE IF NOT EXISTS Receives (id INTEGER PRIMARY KEY AUTOINCREMENT, SenderEmail Text, ReceiverEmail Text, Amount Real, CreateDate DateTime)',
			     null,
				(sqlTnx, reg) => {
					console.log('Receives Table has been created successfully');
				},
				(error) => {
					console.log('Error in creating table' + error.message);
				}
			);});

		db.transaction(tx=>{
				tx.executeSql('insert into Receives (SenderEmail,ReceiverEmail,Amount,CreateDate) '+
			 'values("greg@user.com","kevin@user.com",10.00,"2023-5-10:10:00:00")',null,
			 (sqlTnx,reg)=>console.log("A data was inserted into table successful"),
			 (sqlTnx,error)=>console.log(error),
		);});
	 
		db.transaction(tx=>{
				 tx.executeSql('insert into Receives (SenderEmail,ReceiverEmail,Amount,CreateDate) '+
				 'values("kevin@user.com","junny@user.com",20.00,"2023-5-10:10:00:00")',null,
				 (sqlTnx,reg)=>console.log("A data was inserted into table successful"),
				 (sqlTnx,error)=>console.log(error),
		);});
	};

	//create a database table and insert data
	useEffect(() => {
		createTable();	
	}, []);

	//insert a new payment record to database	
	const AddPayment = () => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO Receives (SenderEmail, ReceiverEmail, Amount, CreateDate) VALUES (?,?,?,?)',
				[paymentRequest.sender_email,paymentRequest.receiver_email,paymentRequest.amount,Date.now]
			);
			(sqlTnx, reg) => {
				console.log(`A new record has been added successful`);
			},
				(error) => {
					console.log('error on adding a user ' + error.message);
			};});
	};

	const dropTable = () =>{
		db.transaction(tx=>{
          tx.executeSql('drop table PassData',null,
		  (sqlTnx,req)=>console.log('The table has been droped'),
		  (sqlTnx,error)=>console.log(error),
		  );});
	};

	const getData=()=>{
		db.transaction(tx=>{
		 tx.executeSql('select * from Receives'),
		 (txObj,resultSet)=>setCollections(resultSet.rows._array),
		 (txObj,error)=>console.log(error)
		});
	 };

	function onSend() {
		AddPayment();
		setPaymentRequest((paymentRequest) => ({
			...paymentRequest,
			status: 1,
		}));
		setqrcode(JSON.stringify(paymentRequest));
		console.log(qrcode);
		console.log(paymentRequest);
		dropTable();
	};

	// const showPayment = ()=>{
	// 	getData();
	// 	return (
	// 		collections.map((collection,index)=>{
	// 			return(
	// 				<View style={styles.row} key={index} >
	// 					<Text>{collection.ReceiverEmail} {collection.Amount}</Text>
	// 					<Button style={styles.button} title='Delete' onPress={()=>deleteCollection(pay.id)}/>
	// 				</View>
	// 			);}));
	// }

	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<View>
				{paymentRequest.status > 0 && (
					<QRCode
						style={{ flex: 0.5 }}
						value={qrcode}
						size={300}
					/>
				)}
				<Text>Sender Email</Text>
				<TextInput
					editable={false}
					selectTextOnFocus={false}
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					defaultValue={paymentRequest.sender_email}
				/>
				<Text>Receiver email</Text>
				<TextInput
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					onChangeText={(setEmail) =>
						setPaymentRequest((paymentRequest) => ({
							...paymentRequest,
							receiver_email: setEmail,
						}))
					}
				/>
				<Text>Amount</Text>
				<TextInput
					keyboardType="decimal-pad"
					inputMode="decimal"
					onChangeText={(newAmount) =>
						setPaymentRequest((paymentRequest) => ({
							...paymentRequest,
							amount: newAmount,
						}))
					}
				/>
				<Button
					title="Send"
					onPress={onSend}
				/>
			</View>

		</View>
	);
}
