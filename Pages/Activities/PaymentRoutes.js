import Send from "./Send";

//commented out for now as 'express' is undefined
/*
const express = require("express");
//const router=express.Router();
const app = express();
//router endpoint
//module.exports=router;

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/intent", (req, res) => {
  try{
    const { items } = Send.amount;
  // Create a PaymentIntent with the order amount and currency
    const paymentIntent = stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}catch(e){
    res.status(400).json({
        error:e.message,
    })
}
});
*/
