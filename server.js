const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


// All routes for the APIs //
const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');
const orderRoutes = require('./src/routes/order.routes');
const authRoutes = require('./src/routes/user.routes');
const sellRoutes = require('./src/routes/sell.routes');


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.get('/', (req, res) => {
  res.send('API product');
});

// Initiate the API //
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/login', authRoutes);
app.use('/api/v1/customers', authRoutes);
app.use('/api/v1/sells', sellRoutes);


const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
