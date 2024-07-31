const express = require("express");
const {
  getSessionReport,
  getUniqueModulesFromReports,
  getModuleSessionsFromReport,
  getSessionReportGeneral,
  getSessionReportMisc,
  getSessionReportDerivedParameters,
  getBaseParametersForDerived,
  getDerivedParameterDetails,
  getDerivedParameterBaseScores,
  getDerivedParameterScores,
  getBaseParameterScores,
  getBaseParameterDetails,
  getSessionReportList,
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

router.post("/derived-parameter-details", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): derived-parameter-details\n");
  next();
}, getDerivedParameterDetails)

router.post("/derived-parameter-base-scores", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): derived-parameter-base-scores\n");
  next();
}, getDerivedParameterBaseScores)

router.post("/derived-parameter-scores", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): derived-parameter-scores\n");
  next();
}, getDerivedParameterScores)

router.post("/base-parameter-scores", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): base-parameter-scores\n");
  next();
}, getBaseParameterScores)

router.post("/base-parameter-details", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): base-parameter-details\n");
  next();
}, getBaseParameterDetails)

router.post("/session-report-list", protect, (req, res, next) => {
  console.log("\nROUTE HIT (reports.route): session-report-list\n");
  next();
}, getSessionReportList)

module.exports = router;
