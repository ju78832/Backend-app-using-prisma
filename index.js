const express = require("express");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("Hi! I m Juned");
});

app.listen(3000, () => {
  console.log("Port running at 3000");
});
