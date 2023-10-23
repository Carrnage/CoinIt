import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../../Stylesheets/AppStyleLight';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { openDatabase } from 'expo-sqlite';

const Tab = createMaterialBottomTabNavigator();
const db=openDatabase('CoinIt.db');

export default function HomeScreen({ navigation }) {
// 	const [transaction, setTransaction] = useState('~');
//   function historyredirect() {
//     {navigation.navigate('CoinIt - Transactions')}
//   }
   const [payments,setPayments] = useState([]);
   const [Receives,setReceives] = useState([]);
   const [passData,setPassData]=useState([]);

   const getPassData = () =>{
	db.transaction(tx=>{
		tx.executeSql('select * from PassData where id = (select MAX(id) form PassData)',null,
		(txObj,resultSet)=>setPassData(resultSet.rows._array),
		(txObj,error)=>console.log(error),
		);});
   };

   useEffect(()=>{
	getPassData();
   },[])

   const getPaymentData = () =>{
	  db.transaction(tx=>{
		tx.executeSql('select * from Payment where ReceiverEmail = ?',[passData[0].Email],
		(txObj,resultSet)=>setPayments(resultSet.rows._array),
		(txObj,error)=> console.log(error),
		)});

	return (
		payments.map((payment,index)=>{
			return(
				<View style={styles.container}>
				<Text style={styles.subtitle2}>Payment History</Text>
				<View style={styles.row} key={index}>
				<Text>{payment.SenderEmail}</Text>
				<Text>{payment.Amount}</Text>					
				</View></View>
	    );}));
   };

   const getReceivesData = () =>{
	db.transaction(tx=>{
	  tx.executeSql('select * from Receives where SenderEmail = ?',[passData[0].Email],
	  (txObj,resultSet)=>setReceives(resultSet.rows._array),
	  (txObj,error)=> console.log(error),
	  )});

	return (
		Receives.map((receive,index)=>{
			return(
				<View style={styles.container}>
				<Text style={styles.subtitle2}>Receive History</Text>
				<View style={styles.row} key={index}>
				<Text>{receive.ReceiverEmail}</Text>
				<Text>{receive.Amount}</Text>					
				</View></View>
	);}));
 };

	return (
		<View style={[{ flexDirection: 'column' }, styles.container]}>
			<Text style={styles.title}>CoinIt</Text>
			<StatusBar style="auto" />
			<View>
				<Text style={styles.subtitle1}>Home</Text>
				<Text style={styles.subtitle2}>Welcome {passData[0].Email}</Text>
			</View>
			<View style={styles.titleBox}>
			<Text>Transaction History</Text>
                <View style={styles.row}>
                 {getPaymentData()}
				 {getReceivesData()};
			    </View>
				{/* <Pressable
					style={styles.button}
					onPress={historyredirect}>
					<Text style={styles.buttonText}>{transaction}</Text>
				</Pressable> */}
			</View>
		</View>
	);
}
