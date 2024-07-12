const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    console.log('token received (auth.js:protect)')
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  } else {
    console.log("NO JWT TOKEN FOUND (auth.js:protect)");
    res.status(401).json({ message: "Not authorized, no token." });
  }
};

module.exports = { protect };
