import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, SectionList, Text, View, TextInput } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState, useEffect } from 'react';
import { Login } from './Login';
import * as SQLite from 'expo-sqlite';
import QRCode from 'react-native-qrcode-svg';
import Stripe from 'react-native-stripe-payments';

const db = SQLite.openDatabase({
	name: 'CoinIt.db',
	location: 'default',
});

export default function SendScreen() {
	//define a stripe by PublishableKey
	//const stripe = require("stripe")('sk_test_51NtqGXCWBcyMptLjhdWJxEPDagVO0OUZMiHNwh7NlgdwEwDQzTuvqNzeXHnbaFN0FWySlSWymr4E8Ved18ddX4LS002ZUcbm9P');
	//  Stripe.setPublishableKey('sk_test_51NtqGXCWBcyMptLjhdWJxEPDagVO0OUZMiHNwh7NlgdwEwDQzTuvqNzeXHnbaFN0FWySlSWymr4E8Ved18ddX4LS002ZUcbm9P');

	/*	try {
		const [senderEmail, setSenderEmail] = useState(Login.email);
	} catch (error) {
		console.log('Login.email is null expected result of using debug entry');
	}
	if (senderEmail=null){
		const [senderEmail, setSenderEmail] = useState('Default@debug.com');
	}
	const [receiverEmail, setReceiverEmail] = useState('');
	const [amount, setAmount] = useState(0);
	const [generateDate, setGenerateDate] = useState(null);
	const [paymentDate, setPaymentDate] = useState(null);
	const [status, setStatus] = useState(0);
	const payment = require('./PaymentRoutes');
	const [paymentResponse, setPaymentResponse] = useState();
*/

	const [paymentRequest, setPaymentRequest] = useState({
		id: 'Payment Request',
		sender_email: 'defaultSender',
		receiver_email: 'defaultReceiver',
		amount: 0.0,
		payment_method: 'default',
		status: 0,
	});
	const [qrcode, setqrcode] = useState(JSON.stringify(paymentRequest));
	//here there be commented broken code
	/*
	//create a database table and insert data
	useEffect(() => {
		createPaymentTable();
	}, []);
*/
	/*
	//create a table named payment
	async function createPaymentTable() {
		await db.transaction(async (tx) => {
			await tx.executeSql(
				'CREATE TABLE IF NOT EXISTS Payment (id INTEGER PRIMARY KEY AUTOINCREMENT, SenderEmail varchar(30), ReceiverEmail varchar(30), Amount decimal(5,2), CreateDate datetime, PaymentDate datetime, PaymentID varchar(30), Status varchar(10))',
				[],
				(sqlTnx, reg) => {
					console.log('Payment Table has been created successful');
				},
				(error) => {
					console.log('Error in creating table' + error.message);
				}
			);
		});
	}
*/
	//insert a new payment record to database
	/*
	const AddPayment = () => {
		if (
			receiverEmail.length == 0 ||
			senderEmail.length == 0 ||
			amount == null ||
			generateDate.length == 0
		) {
			alert('Please input valid user information!');
			return false;
		}

		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO Users (SenderEmail, ReceiverEmail, Amount, CreateDate, PaymentDate, PaymentID, Status) VALUES (?,?,?,?,?,?,?)',
				[
					senderEmail,
					receiverEmail,
					amount,
					generateDate,
					paymentDate,
					paymentIntentID,
					status,
				]
			);
			(sqlTnx, reg) => {
				console.log('The ${ReceiverEmail} record has been added successful');
			},
				(error) => {
					console.log('error on adding a user ' + error.message);
				};
		});
	};
*/
	//starting Stripe function
	//create a stripe intent
	/*
const StripeIntent = async(req,res)=>{
   try{
    const paymentIntent = await Stripe.createPaymentIntent({
      amount: {amount},
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
  //get a response and paymentIntent ID from stripe
    paymentResponse=await paymentIntent.client_secret;
    res.json({ paymentIntent: paymentResponse});
    //console.log(paymentResponse);
    console.log(paymentIntent.id);
   }
   catch(ex){
    res.status(400).json({
      error: e.message,
    });
   }
}
*/
	/*
	//get current date for create a payment in database
	const getDate = () => {
		const generate = new Date();
		const formattedTime = generate.toLocaleTimeString();
		setGenerateDate(formattedTime);
	};

	//update date to current from paid date in database
	const update = () => {
		const payment = new Date();
		const formattedTime = payment.toLocaleDateString();
		setPaymentDate(formattedTime);
	};

	const setqr = () => {
		setPaymentRequest(paymentRequest.sender_email=senderEmail,paymentRequest.receiver_email=receiverEmail,paymentRequest.amount=amount)
		console.log(paymentRequest);
		setStatus(1)
		JSON.stringify(PaymentRequest);
	};
*/
	function onSend() {
		//AddPayment();
		//				StripeIntent();
		//		setqr();
		setPaymentRequest((paymentRequest) => ({
			...paymentRequest,
			status: 1,
		}));
		console.log(qrcode);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<View>
				{paymentRequest.status > 0 && (
					<QRCode
						style={{ flex: 0.5 }}
						value={qrcode}
					/>
				)}
				<Text>Sender Email</Text>
				<TextInput
					disabled={true}
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					defaultValue={setPaymentRequest.sender_email}
				/>
				<Text>Receiver email</Text>
				<TextInput
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					onChangeText={setPaymentRequest.receiver_email}
				/>
				<Text>Amount</Text>
				<TextInput
					keyboardType="decimal-pad"
					inputMode="decimal"
					onChangeText={setPaymentRequest.amount}
				/>
				<Button
					title="Send"
					onPress={onSend}
				/>
			</View>
		</View>
	);
}
