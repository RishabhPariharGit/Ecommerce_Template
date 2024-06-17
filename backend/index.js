const express = require('express');
const connectDB = require('./Database/Connection');
const UserModel = require('./Model/User');
const Router = require("./Routes/AllRoutes");
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // If your frontend sends cookies
}));

app.use(express.json());

connectDB();
UserModel();

app.use('/', Router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
