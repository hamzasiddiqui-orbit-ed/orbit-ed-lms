const express = require("express");
const {
  authUser,
  unrealAuthUser,
  logoutUser,
  updateUserProfile,
  changePassword,
  changePin,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", authUser);

router.post(
  "/loginUnreal",
  unrealAuthUser,
  (req, res, next) => {
    console.log("\nROUTE HIT (user.route): loginUnreal\n");
    next();
  },
  unrealAuthUser
);

router.post("/logout", logoutUser);

router.post(
  "/update-user-profile",
  protect,
  (req, res, next) => {
    console.log("\nROUTE HIT (user.route): update-user-profile\n");
    next();
  },
  updateUserProfile
);

router.post(
  "/change-password",
  protect,
  (req, res, next) => {
    console.log("\nROUTE HIT (user.route): change-password\n");
    next();
  },
  changePassword
);

router.post(
  "/change-pin",
  protect,
  (req, res, next) => {
    console.log("\nROUTE HIT (user.route): change-pin\n");
    next();
  },
  changePin
);

module.exports = router;
