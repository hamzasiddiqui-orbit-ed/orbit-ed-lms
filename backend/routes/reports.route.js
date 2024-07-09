const express = require("express");
const {
  getUserReports,
  getUserReport,
  getMostRecentUserReport,
  getUserReportsDetailed,
} = require("../controllers/reports.controller");

const router = express.Router();

router.get("/getUserReports", getUserReports);

router.get("/getUserReport", (req, res, next) => {
  console.log("getUserReport route hit");
  next();
}, getUserReport);

router.post("/getMostRecentUserReport", (req, res, next) => {
  console.log("getMostRecentUserReport route hit");
  next();
}, getMostRecentUserReport);

router.get("/getUserReportsDetailed", getUserReportsDetailed);

module.exports = router;
