const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // req.body가 객체로 인식이 됨

const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB Connection Fail >> ", err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("server on");
});
