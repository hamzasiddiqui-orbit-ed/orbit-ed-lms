const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const reportRoutes = require("./routes/reports.route");
const moduleRoutes = require("./routes/modules.route");

var app = express();

// Updation to be made for CORS configuration later

// let corsOptions = {
//   origin: process.env.FRONTEND_SERVER.split(','),
//   origin: ['http://localhost:3000', 'http://192.168.18.47:3000'],
//   credentials: true,
// };

const corsOptions = {
  origin: 'http://192.168.18.44:3000',
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
app.use("/api/modules", moduleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening to port 8000");
});
