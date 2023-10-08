import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, SectionList, Text, View, TextInput } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState, useEffect } from 'react';
import { Login } from './Login';
import * as SQLite from 'expo-sqlite';
import QRCode from 'react-native-qrcode-svg';

const db = SQLite.openDatabase({
	name: 'CoinIt.db',
	location: 'default',
});

export default function SendScreen() {
	//define a stripe by PublishableKey
	//const stripe = require("stripe")('sk_test_51NtqGXCWBcyMptLjhdWJxEPDagVO0OUZMiHNwh7NlgdwEwDQzTuvqNzeXHnbaFN0FWySlSWymr4E8Ved18ddX4LS002ZUcbm9P');

	const [personalEmail, setPersonalEmail] = useState('');
	const [merchantEmail, setMerchantEmail] = useState(Login.email);
	const [amount, setAmount] = useState(0);
	const [generateDate, setGenerateDate] = useState(null);
	const [paymentDate, setPaymentDate] = useState(null);
	const [status, setStatus] = useState(false);
	//const payment =require('./PaymentRoutes');
	const [paymentResponse, setPaymentResponse] = useState();

	const [paymentRequest, setPaymentRequest] = useState({
		id: 'Payment Request',
		personal_email: 'default',
		merchant_email: 'default',
		amount: 0.0,
		payment_method: 'default',
		status: 0,
	});
	const [qrcode, setqrcode] = useState(JSON.stringify(paymentRequest));

	//create a database table and insert data
	useEffect(() => {
		createPaymentTable();
	}, []);

	//create a table named payment
	async function createPaymentTable() {
		await db.transaction(async (tx) => {
			await tx.executeSql(
				'CREATE TABLE IF NOT EXISTS Payment (id INTEGER PRIMARY KEY AUTOINCREMENT, MerchantEmail varchar(30), PersonalEmail varchar(30), Amount decimal(5,2), CreateDate datetime, PaymentDate datetime, PaymentID varchar(30), Status varchar(10))',
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
	//insert a new payment record to database
	const AddPayment = () => {
		if (
			personalEmail.length == 0 ||
			merchantEmail.length == 0 ||
			amount == null ||
			generateDate.length == 0
		) {
			alert('Please input valid user information!');
			return false;
		}

		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO Users (MerchantEmail, PersonalEmail, Amount, CreateDate, PaymentDate, PaymentID, Status) VALUES (?,?,?,?,?,?,?)',
				[
					merchantEmail,
					personalEmail,
					amount,
					generateDate,
					paymentDate,
					paymentIntentID,
					status,
				]
			);
			(sqlTnx, reg) => {
				console.log('The ${personalEmail} record has been added successful');
			},
				(error) => {
					console.log('error on adding a user ' + error.message);
				};
		});
	};

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

	const setQRCode = () => {
		JSON.stringify(PaymentResponse);
	};

	function onSend() {
		AddPayment();
		StripeIntent();
		setQRCode();
		// setPaymentRequest((paymentRequest) => ({
		//   ...paymentRequest,
		//   status: 1,
		// }));

		console.log(qrcode);
		console.log(paymentRequest);
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
				<Text>Personal email</Text>
				<TextInput
					disabled={true}
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					defaultValue={paymentRequest.personal_email}
				/>
				<Text>Merchant Email</Text>
				<TextInput
					autoComplete="email"
					textContentType="emailAddress"
					inputMode="email"
					enterKeyHint="next"
					onChangeText={(setEmail) =>
						setPaymentRequest((paymentRequest) => ({
							...paymentRequest,
							merchant_email: setEmail,
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
