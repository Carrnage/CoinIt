const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); 

const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON body parser middleware
app.use(express.json());

// Use static files from "public" directory
app.use(express.static("public"));

// Import routes from another module
const setupPaymentRoutes = require('./paymentRoutes');
setupPaymentRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
