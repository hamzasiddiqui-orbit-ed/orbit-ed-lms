const express = require("express");
const { getSessionModule } = require("../controllers/modules.controller");
const { protect } = require("../middlewares/auth");

const router = express.Router()

router.post("/session-module", protect, (req, res, next) => {
    console.log("\nROUTE HIT (modules.route): getSessionModule\n");
    next();
}, getSessionModule);

module.exports = router;