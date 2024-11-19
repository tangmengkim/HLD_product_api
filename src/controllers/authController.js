const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res) {
  const { username, password, role } = req.body;
  const encryptPassword =  CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString()
  console.log(encryptPassword)

  try {
    const user = await User.create({ username, password: encryptPassword, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8) === password ? true : false;
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1y' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
}

module.exports = { register, login };
