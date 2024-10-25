const express = require('express');
const app = express();
const { calculateShippingCharge } = require('./shippingService');
const shippingService = require('./shippingService');
app.use(express.json());

// Test API
app.get('/', (req, res) => {
  res.send('Shopping Charge Calculator');
});


app.post('/shipping-charge', (req, res) => {
  const { customerLat, customerLong, products, deliveryType } = req.body;
  
  if (!customerLat || !customerLong || !products || !deliveryType) {
      return res.status(400).send({ error: "Missing required fields" });
  }

  try {
      const shippingCharge = calculateShippingCharge(customerLat, customerLong, products, deliveryType);
      res.send({ ShippingCharge: shippingCharge.toFixed(2) });
  } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 
