const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const reportRoutes = require("./routes/reports.route");

var app = express();

let corsOptions = {
  origin: process.env.FRONTEND_SERVER,
  credentials: true,
};

// Registering middlewares
dotenv.config();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Calling for DB connection
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening to port 8000");
});
