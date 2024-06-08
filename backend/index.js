const express = require('express')
const connectDB = require('./Database/Connection')
const UserModel = require('./Model/User');

const Router = require("./Routes/AllRoutes");
const cors = require('cors');
const app = express()

require('dotenv').config();
app.use(express.json());
const PORT = process.env.PORT;

connectDB();
UserModel();


app.use('/', Router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})