const express = require("express");
const {
  getSessionModule,
  getUniqueAssignedModules,
  getAssignedModuleDetails,
} = require("../controllers/modules.controller");
const { protect, protectUnreal } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/session-module",
  protectUnreal,
  (req, res, next) => {
    console.log("\nROUTE HIT (modules.route): session-module\n");
    next();
  },
  getSessionModule
);

router.post(
  "/assigned-modules",
  protect,
  (req, res, next) => {
    console.log("\nROUTE HIT (modules.route): assigned-modules\n");
    next();
  },
  getUniqueAssignedModules
);

router.post(
  "/module-general-details",
  protect,
  (req, res, next) => {
    console.log("\nROUTE HIT (modules.route): module-general-details\n");
    next();
  },
  getAssignedModuleDetails
);

module.exports = router;
