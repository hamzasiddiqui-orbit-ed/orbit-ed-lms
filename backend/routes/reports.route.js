const express = require("express");
const {
  getUserReports,
  getUserReport,
  getMostRecentUserReport,
  getModuleReport,
  getModuleSessionReport,
  getSessionReport,
  getUniqueModulesFromReports,
  getModuleSessionsFromReport,
  getUserReportsDetailed,
} = require("../controllers/reports.controller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/getUserReports", protect, getUserReports);

router.post("/getUserReport", protect, (req, res, next) => {
  console.log("getUserReport route hit");
  next();
}, getUserReport);

router.post("/getMostRecentUserReport", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getMostRecentUserReport\n");
  next();
}, getMostRecentUserReport);

router.post("/getModuleReport", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleReport\n");
  next();
}, getModuleReport);

router.post("/getModuleSessionReport", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleSessionReport\n");
  next();
}, getModuleSessionReport);

router.post("/getSessionReport", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getSessionReport\n");
  next();
}, getSessionReport);

router.post("/getUniqueModulesFromReports", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getUniqueModulesFromReports\n");
  next();
}, getUniqueModulesFromReports);

router.post("/getModuleSessionsFromReport", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleSessionsFromReport\n");
  next();
}, getModuleSessionsFromReport);

router.post("/getUserReportsDetailed", protect, getUserReportsDetailed);

module.exports = router;
