import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {openDatabase} from 'expo-sqlite';
import {AppStyleLight, styles} from '../../Stylesheets/AppStyleLight';

//ADD localhost address of your server
const API_URL = "http://localhost:3000";
const db = openDatabase('CoinIt.db');

export default StripeApp = props => {
    const [amount, setAmount] = useState(Receive.requestPayment.amount);
    const [email,setEmail]=useState('Receive.requestPayment.receiver_email');
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();
    const [Payment,setPayment]=useState([]);
  
const getPaymentData=()=>{
  db.transaction(tx=>{
    tx.executeSql('select * from Payments where id = (select MAX(id) from Payments)',null,
    (txObj,resultSet)=>setPayment(resultSet.rows._array),
    (txObj,error)=>console.log(error)
    );});    
};

useEffect(() => {
   getPaymentData();
}, []);	

    const fetchPaymentIntentClientSecret = async () => {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    };
  
    const handlePayPress = async () => {
      AddPayment();
      //Gather the customer's billing information (e.g., email)
      if (!cardDetails?.complete || !email) {
        Alert.alert("Please enter Complete card details and Email");
        return;
      }
      const billingDetails = {
        email: email,
      };
      //Fetch the intent client secret from the backend
      try {
        const { clientSecret, error } = await fetchPaymentIntentClientSecret();
        //confirm the payment
        if (error) {
          console.log("Unable to process payment");
        } else {
          const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: "Card",
            billingDetails: billingDetails,
          });
          if (error) {
            alert(`Payment Confirmation Error ${error.message}`);
          } else if (paymentIntent) {
            alert("Payment Successful");
            console.log("Payment successful ", paymentIntent);
          }
        }
      } catch (e) {
        console.log(e);
      }
      //3.Confirm the payment with the card details
    };
  
    return (
      <View style={styles.container}>
        <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
       />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={cardDetails => {
            setCardDetails(cardDetails);
          }}
        />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      </View>
    );
  };