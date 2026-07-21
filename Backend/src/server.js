const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/database");

const userRoute = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();