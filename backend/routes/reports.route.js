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

const router = express.Router();

router.get("/getUserReports", getUserReports);

router.get("/getUserReport", (req, res, next) => {
  console.log("getUserReport route hit");
  next();
}, getUserReport);

router.post("/getMostRecentUserReport", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getMostRecentUserReport\n");
  next();
}, getMostRecentUserReport);

router.post("/getModuleReport", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleReport\n");
  next();
}, getModuleReport);

router.post("/getModuleSessionReport", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleSessionReport\n");
  next();
}, getModuleSessionReport);

router.post("/getSessionReport", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getSessionReport\n");
  next();
}, getSessionReport);

router.post("/getUniqueModulesFromReports", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getUniqueModulesFromReports\n");
  next();
}, getUniqueModulesFromReports);

router.post("/getModuleSessionsFromReport", (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): getModuleSessionsFromReport\n");
  next();
}, getModuleSessionsFromReport);

router.get("/getUserReportsDetailed", getUserReportsDetailed);

module.exports = router;
