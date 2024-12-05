const cookieParser = require("cookie-parser");
const express = require("express");

require("dotenv").config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const userRouter = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use("/api", userRouter);
app.use("/api", postRoute);

app.get("/", (req, res) => {
  res.send("Hi! I m Juned");
});

app.listen(3000, () => {
  console.log("Port running at 3000");
});
