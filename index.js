const express = require("express");
var cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const authRoutes = require("./routes/auth");

app.use(cors())   // <---- use cors middleware

// middlewares
app.use(express.json()); // for body parser

// route middlewares
app.use("/api/user", authRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("server is running..." + port));
