const express = require("express");
const { authUser, unrealAuthUser, logoutUser } = require("../controllers/user.controller");

const router = express.Router();

router.post('/login', authUser);

router.post("/loginUnreal", unrealAuthUser, (req, res, next) => {
    console.log("\nROUTE HIT (user.route): loginUnreal\n");
    next();
}, unrealAuthUser);

router.post('/logout', logoutUser);

module.exports = router;