const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./dbconnect/db');
const userRoute = require('./routes/user.routes');

require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

app.use(cors());
app.use(express.json()); // Parses incoming requests with JSON payloads.

app.use('/api/users', userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});