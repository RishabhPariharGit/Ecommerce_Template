const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./Database/Connection');
const UserModel = require('./Model/User');
const Router = require("./Routes/AllRoutes");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // If your frontend sends cookies
}));


app.use(cors());
app.use(express.json());

connectDB();
UserModel();


const users = [];
// Middleware to check JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, 'secretkey', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

// Signup endpoint
app.post('/sign-up', async (req, res) => {
  const { username, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, email, phone, password: hashedPassword });
  res.status(201).send('User created');
});

// Login endpoint
app.post('/log-in', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username, email: user.email }, 'secretkey');
      res.json({ token });
  } else {
      res.status(400).send('Invalid credentials');
  }
});



app.use('/', Router);

app.get('/admindashboard', authenticateToken, (req, res) => {
  res.json({ message: 'This is your profile', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
