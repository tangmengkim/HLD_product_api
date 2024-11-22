const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')
require('./config/database').sync();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

module.exports = app;
