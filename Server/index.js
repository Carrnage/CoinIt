import express from 'express';
import Stripe from 'stripe';
//import {Receive} from '../Pages/Activities/Receive';
import { useState } from 'react';

const app = express();
const port = 3000;
const PublishableKey="pk_test_51NtqGXCWBcyMptLjOUgDhCAcm8pQG8oz66xblt2IDx7qPIxRaUnoZrN1e4g2CDRFqivXmjOP6JIMcdkLVc9Hzg7c00JU0bZ5ak";
const SecretKey = "sk_test_51NtqGXCWBcyMptLjhdWJxEPDagVO0OUZMiHNwh7NlgdwEwDQzTuvqNzeXHnbaFN0FWySlSWymr4E8Ved18ddX4LS002ZUcbm9P";
//const [amount,setAmount]=useState(Receive.requestPayment.amount);

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SecretKey, { apiVersion: "2023-08-16" });

app.listen(port, () => {
    console.log(`The app is listening at http://localhost:${port}`);
  });

  app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        //the transaction amount is based on the amount in Receive page
        amount: amount, //lowest denomination of particular currency is 1096
        currency: "usd",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });
