const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
require('./config/database').sync();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

module.exports = app;
