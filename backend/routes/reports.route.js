const express = require("express");
const {
  getSessionReport,
  getUniqueModulesFromReports,
  getModuleSessionsFromReport,
  getSessionReportGeneral,
  getSessionReportMisc,
  getSessionReportDerivedParameters,
  getBaseParametersForDerived,
} = require("../controllers/reports.controller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

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

router.post("/session-report-general", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): session-report-general\n");
  next();
}, getSessionReportGeneral)

router.post("/session-report-misc", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): session-report-misc\n");
  next();
}, getSessionReportMisc)

router.post("/session-report-derived-parameters", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): session-report-derived-parameters\n");
  next();
}, getSessionReportDerivedParameters)

router.post("/base-parameters-from-derived", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): base-parameters-from-derived\n");
  next();
}, getBaseParametersForDerived)

module.exports = router;
