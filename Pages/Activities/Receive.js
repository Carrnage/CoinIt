import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../../Stylesheets/AppStyleLight';
import { useState } from 'react';
import {openDatabase} from 'expo-sqlite';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType, BarCodeSettings } from 'expo-camera';

const Stack = createNativeStackNavigator();
const db=openDatabase('CoinIt.db');

export default function ReceiveScreen() {
	const [type, setType] = useState(CameraType.back);
	const [scanned, setScanned] = useState(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [isSeedData,setIsSeedData]=useState(false);
	const [requestPayment, setRequestPayment] = useState({
		id: 'Payment Request',
		payment_id: 0,
		sender_email: 'defaultSender',
		receiver_email: 'defaultReceiver',
		amount: 0.0,
		message: 'default',
		status: 0,
	});
	const [paymentConfirm, setPaymentConfirm] = useState({
		id: 'dunno, workshop it',
		payment_id: 0,
		confirm: false,
	});
	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}
	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>
					We need your permission to show the camera
				</Text>
				<Button
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	};	

	const createPaymentTable=()=> {
		//create a table named Payment
		db.transaction(tx => {
		  tx.executeSql(
			 'CREATE TABLE IF NOT EXISTS Payments (id INTEGER PRIMARY KEY AUTOINCREMENT, SenderEmail Text, ReceiverEmail Text, Amount Real, CreateDate Text)',
			null,
			 (sqlTnx, reg) => {
			   console.log('Payment Table has been created successful');
			 },
			 (error) => {
			   console.log('Error in creating table' + error.message);
			 }
		   );});
	
		  //insert seed data
		   db.transaction(tx=>{
			tx.executeSql('insert into Payment (SenderEmail,ReceiverEmail,Amount,CreateDate) '+
			'values("greg@user.com","kevin@user.com",2000.00,"2023-5-10:10:00:00")',null,
			(sqlTnx,reg)=>console.log("A data was inserted into table successful"),
			(sqlTnx,error)=>console.log(error),
			);});
		 
			db.transaction(tx=>{
			  tx.executeSql('insert into Payment (SenderEmail,ReceiverEmail,Amount,CreateDate) '+
			  'values("kevin@user.com","junny@user.com",2500.00,"2023-5-10:10:00:00")',null,
			  (sqlTnx,reg)=>console.log("A data was inserted into table successful"),
			  (sqlTnx,error)=>console.log(error),
			  );}); 
	   };
	
	   useEffect(() => {
		  createPaymentTable();
	  }, []);

	  //insert a new payment record to database	
	const AddPayment = () => {    
		db.transaction((tx) => {
		  tx.executeSql(
			'INSERT INTO Payment (SenderEmail, ReceiverEmail, Amount, CreateDate) VALUES (?,?,?,?)',
			[requestPayment.sender_email,requestPayment.receiver_email,requestPayment.amount,Date.now]
		  );
		  (sqlTnx, reg) => {
			console.log('A new record has been added successfully');
		  },
			(error) => {
			  console.log('error on adding a user ' + error.message);
			};
		});};


	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		);
		setRequestPayment(JSON.parse(data));
		console.log(requestPayment);
	};
	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}
	function confirmPress() {
		setScanned(false);		
		setRequestPayment({
			id: 'Payment Request',
			payment_id: 0,
			sender_email: 'defaultSender',
			receiver_email: 'defaultReceiver',
			amount: 0.0,
			message: 'default',
			status: 0,
		});

        AddPayment();
		alert('Payment Confirmed');
		navigation.navigate('CoinIt-Stripe');		
	}

	function declinePress() {
		setScanned(false);
		alert('Payment Cancelled');
		setRequestPayment({
			id: 'Payment Request',
			payment_id: 0,
			sender_email: 'defaultSender',
			receiver_email: 'defaultReceiver',
			amount: 0.0,
			message: 'default',
			status: 0,
		});
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
				<View style={{ flex: 0.6, width: '80%' }}>
					<Camera
						style={styles.camera}
						type={type}
						barCodeScannerSettings={{
							barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
						}}
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
						<View>
							<TouchableOpacity
								style={styles.button}
								onPress={toggleCameraType}>
								<Text style={styles.text}>Flip Camera</Text>
							</TouchableOpacity>
						</View>
					</Camera>
					{scanned && (
						<Button
							title={'Tap to Scan Again'}
							onPress={() => setScanned(false)}
						/>
					)}
				</View>
				{requestPayment.status > 0 && (
					<View style={{ flex: 0.3 }}>
						<Text style={styles.text}>Sender Email</Text>
						<Text style={styles.text}>{requestPayment.sender_email}</Text>
						<Text style={styles.text}>Receiver Email</Text>
						<Text style={styles.text}>{requestPayment.receiver_email}</Text>
						<Text style={styles.text}>Amount</Text>
						<Text style={styles.text}>${requestPayment.amount}</Text>
						<Text style={styles.text}>Message</Text>
						<Text style={styles.text}>{requestPayment.message}</Text>
						<Pressable
							style={styles.button}
							title="Confirm"
							onPress={confirmPress}>
							<Text style={styles.buttonText}>Confirm</Text>
						</Pressable>
						<Pressable
							style={styles.button}
							title="Decline"
							onPress={declinePress}>
							<Text style={styles.buttonText}>Decline</Text>
						</Pressable>
					</View>
				)}
			</View>
		</View>
	);
}
