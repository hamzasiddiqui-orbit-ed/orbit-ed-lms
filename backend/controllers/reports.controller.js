const mongoose = require("mongoose");
const SessionReport = require("../models/sessionReport.model");
const Parameters = require("../models/parameter.model");
const User = require("../models/user.model");
const Module = require("../models/module.model");

// ----------------------------------------
// Get session report for learner dashboard
// ----------------------------------------
const getSessionReport = async (req, res) => {
  if (req.body.user_id) {
    var user_id = req.body.user_id;
  } else {
    return res
      .status(400)
      .json({ message: "Something went wrong, could not find user ID." });
  }
  if (req.body.module_name) {
    var module_name = req.body.module_name;
  }
  if (req.body.session_count) {
    var session_count = req.body.session_count;
  }

  var options = {
    sort: { createdAt: -1 },
  };

  if (user_id && module_name && session_count) {
    try {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
        module_name: module_name,
        session_count: session_count,
      };

      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Query response: ${err.message}` });
    }
  } else if (user_id && module_name) {
    try {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
        module_name: module_name,
      };

      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Query response: ${err.message}` });
    }
  } else {
    try {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      };

      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Query response: ${err.message}` });
    }
  }

  console.log(result);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "No report found!" });
  }
};

// ---------------------------------------------------
// Gets Unique module names for user's session reports
// ---------------------------------------------------
const getUniqueModulesFromReports = async (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).json({ message: "No user Id found." });
  }

  try {
    var query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
    };

    const result = await SessionReport.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$module_name",
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, module_name: "$_id" } },
    ]);

    if (result && result.length > 0) {
      return res.status(200).json(result.map((item) => item.module_name));
    } else {
      return res.status(404).json({ message: "No report found" });
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ----------------------------------------------------------------------
// Gets 5 latest session counts for user reports according to module name
// ----------------------------------------------------------------------
const getModuleSessionsFromReport = async (req, res) => {
  const user_id = req.body.user_id;
  const module_name = req.body.module_name;

  if (!user_id || !module_name) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    const query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      module_name: module_name,
    };

    const projection = {
      session_count: 1,
      _id: 0, // Exclude the _id field to make the array cleaner
    };

    const options = {
      sort: { createdAt: -1 },
      limit: 5,
    };

    const reports = await SessionReport.find(query, projection, options);

    if (reports && reports.length > 0) {
      // Extract unique session counts from the reports
      const sessionCounts = [
        ...new Set(reports.map((report) => report.session_count)),
      ];
      return res.status(200).json(sessionCounts);
    } else {
      return res.status(404).json({ message: "No report found" });
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ----------------------------------------------------------
// Fetch session report _id, module_name, date, session_count
// ----------------------------------------------------------
const getSessionReportGeneral = async (req, res) => {
  if (req.body.user_id) {
    var user_id = req.body.user_id;
  } else {
    return res.status(400).json({ message: "Could not find user ID." });
  }
  if (req.body.module_name) {
    var module_name = req.body.module_name;
  }
  if (req.body.session_count) {
    var session_count = req.body.session_count;
  }

  try {
    projection = {
      _id: 1,
      module_name: 1,
      total_score: 1,
      session_count: 1,
      createdAt: 1,
    };

    var options = {
      sort: { createdAt: -1 },
    };

    if (user_id && module_name && session_count) {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
        module_name: module_name,
        session_count: session_count,
      };

      var result = await SessionReport.findOne(query, projection, options);
    } else if (user_id && module_name) {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
        module_name: module_name,
      };

      var result = await SessionReport.findOne(query, projection, options);
    } else {
      var query = {
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      };

      var result = await SessionReport.findOne(query, projection, options);
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }

  console.log(result);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "No report found!" });
  }
};

// ---------------------------------------------------------------------
// Fetch session report misc details quiz score, audioUrl, transcription
// ---------------------------------------------------------------------
const getSessionReportMisc = async (req, res) => {
  if (req.body.report_id) {
    var report_id = req.body.report_id;
  } else {
    return res.status(400).json({ message: "Could not find report ID." });
  }

  try {
    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(report_id),
    };

    projection = {
      "quiz.score": 1,
      audio_url: 1,
      transcription: 1,
    };

    var result = await SessionReport.findOne(query, projection);

    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No report found!" });
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ---------------------------------------
// Fetch session report derived parameters
// ---------------------------------------
const getSessionReportDerivedParameters = async (req, res) => {
  if (req.body.report_id) {
    var report_id = req.body.report_id;
  } else {
    return res.status(400).json({ message: "Could not find report ID." });
  }

  try {
    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(report_id),
    };

    projection = {
      "parameters.derived": 1,
    };

    var result = await SessionReport.findOne(query, projection);

    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "No report found!" });
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ---------------------------------------------------------------------
// Fetch base parameters and their scores for a given derived parameter
// ---------------------------------------------------------------------
const getBaseParametersForDerived = async (req, res) => {
  const reportId = req.body.report_id;
  const derivedParameter = req.body.derived_parameter;

  if (!reportId) {
    return res.status(400).json({ message: "Could not find report ID." });
  }

  if (!derivedParameter) {
    return res
      .status(400)
      .json({ message: "Could not find derived parameter." });
  }

  console.log(reportId, derivedParameter);

  try {
    const sessionReport = await SessionReport.findById(reportId);
    if (!sessionReport) {
      return res.status(404).json({ message: "No report found!" });
    }

    const parameterData = await Parameters.findOne({ name: derivedParameter });
    if (!parameterData) {
      return res
        .status(404)
        .json({ message: `No parameter found for ${derivedParameter}` });
    }

    const baseParameters = parameterData.base_parameters;
    const baseScores = {};

    baseParameters.forEach((param) => {
      if (sessionReport.parameters.base[param]) {
        baseScores[param] = sessionReport.parameters.base[param].score;
      }
    });

    return res.status(200).json(baseScores);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ------------------------------
// Fetch derivedParameter details
// ------------------------------
const getDerivedParameterDetails = async (req, res) => {
  const reportId = req.body.report_id;
  const derivedParameter = req.body.derived_parameter;

  if (!reportId) {
    return res.status(400).json({ message: "Could not find report ID." });
  }

  if (!derivedParameter) {
    return res
      .status(400)
      .json({ message: "Could not find derived parameter." });
  }

  try {
    const report = await SessionReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    const derivedParameters = report.parameters.derived;
    if (!derivedParameters || !(derivedParameter in derivedParameters)) {
      return res.status(404).json({
        message: `Derived parameter '${derivedParameter}' not found.`,
      });
    }

    const parameter = await Parameters.findOne({ name: derivedParameter });
    if (!parameter) {
      return res.status(404).json({
        message: `Parameter description for '${derivedParameter}' not found.`,
      });
    }

    const score = derivedParameters[derivedParameter];
    const description = parameter.description;

    return res.status(200).json({
      derived_parameter: derivedParameter,
      score: score,
      description: description,
    });
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// -----------------------------------------------------------
// Fetch base parameters for all derived parameters per report
// -----------------------------------------------------------
const getDerivedParameterBaseScores = async (req, res) => {
  const reportId = req.body.report_id;

  if (!reportId) {
    return res.status(400).json({ message: "Could not find report ID." });
  }

  try {
    const report = await SessionReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    const derivedParameters = report.parameters.derived;
    if (!derivedParameters) {
      return res
        .status(404)
        .json({ message: "Derived parameters not found in the report." });
    }

    const result = [];

    for (const derivedParameter in derivedParameters) {
      const parameter = await Parameters.findOne({ name: derivedParameter });
      if (!parameter) {
        return res.status(404).json({
          message: `Parameter description for '${derivedParameter}' not found.`,
        });
      }

      const baseParameters = parameter.base_parameters;

      console.log(baseParameters);

      const baseScores = {};

      baseParameters.forEach((baseParam) => {
        baseScores[baseParam] =
          report.parameters.base[baseParam]?.score || null;
      });

      result.push({
        derivedParameter: derivedParameter,
        baseParameters: baseScores,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ------------------------------------------------------------
// Fetch derived parameter scores for all reports of the module
// ------------------------------------------------------------
const getDerivedParameterScores = async (req, res) => {
  const {
    user_id: userId,
    module_name: moduleName,
    derived_parameter: derivedParameter,
  } = req.body;

  if (!userId || !moduleName || !derivedParameter) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    const query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(userId),
      module_name: moduleName,
    };

    const sessionReports = await SessionReport.find(query).sort({
      session_count: 1,
    });

    if (!sessionReports || sessionReports.length === 0) {
      return res.status(404).json({
        message: "No session reports found for this user and module.",
      });
    }

    if (
      !sessionReports[0].parameters.derived.hasOwnProperty(derivedParameter)
    ) {
      return res.status(400).json({
        message: `Derived parameter '${derivedParameter}' not found.`,
      });
    }

    const data = sessionReports.map((report) => ({
      sessionCount: report.session_count,
      score: report.parameters.derived[derivedParameter],
    }));

    return res.json(data);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ---------------------------------------------------------
// Fetch base parameter scores for all reports of the module
// ---------------------------------------------------------
const getBaseParameterScores = async (req, res) => {
  const {
    user_id: userId,
    module_name: moduleName,
    base_parameter: baseParameter,
  } = req.body;

  if (!userId || !moduleName || !baseParameter) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    const query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(userId),
      module_name: moduleName,
    };

    const sessionReports = await SessionReport.find(query).sort({
      session_count: 1,
    });

    if (!sessionReports || sessionReports.length === 0) {
      return res.status(404).json({
        message: "No session reports found for this user and module.",
      });
    }

    if (!sessionReports[0].parameters.base.hasOwnProperty(baseParameter)) {
      return res.status(400).json({
        message: `Base parameter '${baseParameter}' not found.`,
      });
    }

    const data = sessionReports.map((report) => ({
      sessionCount: report.session_count,
      score: report.parameters.base[baseParameter].score,
    }));

    return res.json(data);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// -------------------------------------------------
// Fetch base parameter details for a session report
// -------------------------------------------------
const getBaseParameterDetails = async (req, res) => {
  const { report_id: reportId, base_parameter: baseParameter } = req.body;

  if (!reportId || !baseParameter) {
    return res.status(400).json({ message: "Missing required data." });
  }

  paras = [
    "speech_rate",
    "eye_contact",
    "loudness",
    "pauses",
    "repetitive_words",
    "filler_sounds",
    "pitch",
    "clarity",
    "context",
  ];

  if (!paras.includes(baseParameter)) {
    return res.status(404).json({ message: "No base parameter found." });
  }

  try {
    const query = {
      _id: mongoose.Types.ObjectId.createFromHexString(reportId),
    };

    const projection = {
      [`parameters.base.${baseParameter}`]: 1,
    };

    const response = await SessionReport.findOne(query, projection);

    const data = {
      [baseParameter]: response.parameters.base[baseParameter],
    };

    if (!response || !data) {
      return res.status(404).json({ message: "No report found." });
    } else {
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// -----------------------------
// Fetch List of reports of User
// -----------------------------
// Utility function to format dates (move to middleware)
const formatDate = (date) => {
  if (!date) {
    return null
  }
  
  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};

// Utility function to format dates (move to middleware)
const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getSessionReportList = async (req, res) => {
  const { user_id: userId, module_name: moduleName, page, sort } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing required data." });
  }

  const dataPerPage = 10;

  try {
    let query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(userId),
    };

    if (moduleName) {
      query.module_name = moduleName;
    }

    const sortOptions = {};
    if (sort) {
      switch (sort) {
        case "sessionCountAsc":
          sortOptions.session_count = 1;
          break;
        case "moduleNameAsc":
          sortOptions.module_name = 1;
          break;
        case "dateTakenAsc":
          sortOptions.createdAt = 1;
          break;
        case "durationAsc":
          sortOptions.total_time = 1;
          break;
        case "sessionScoreAsc":
          sortOptions.total_score = 1;
          break;
        case "quizScoreAsc":
          sortOptions["quiz.score"] = 1;
          break;
        case "sessionCountDesc":
          sortOptions.session_count = -1;
          break;
        case "moduleNameDesc":
          sortOptions.module_name = -1;
          break;
        case "dateTakenDesc":
          sortOptions.createdAt = -1;
          break;
        case "durationDesc":
          sortOptions.total_time = -1;
          break;
        case "sessionScoreDesc":
          sortOptions.total_score = -1;
          break;
        case "quizScoreDesc":
          sortOptions["quiz.score"] = -1;
          break;
        default:
          break;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const reports = await SessionReport.find(query)
      .select(
        "session_count module_name createdAt total_time total_score quiz.score transcription"
      )
      .skip((page - 1) * dataPerPage)
      .limit(dataPerPage)
      .sort(sortOptions);

    const totalReports = await SessionReport.countDocuments(query);
    const totalPages = Math.ceil(totalReports / dataPerPage);

    if (page > totalPages) {
      return res.status(400).json({ message: "Invalid page number. Page number exceeds total pages." });
    }

    const formattedReports = reports.map((report) => ({
      reportId: report._id,
      sessionCount: report.session_count,
      moduleName: report.module_name,
      dateTaken: formatDate(report.createdAt),
      duration: formatDuration(report.total_time),
      sessionScore: report.total_score.toFixed(1),
      quizScore: report.quiz.score.toFixed(1),
      transcript: report.transcription,
    }));

    return res.status(200).json({
      page,
      totalPages,
      dataPerPage,
      totalReports,
      reports: formattedReports,
    });
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ---------------------------------------------
// Fetch quiz details of a user's session report
// ---------------------------------------------
const getQuizDetails = async (req, res) => {
  const { report_id: reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({ error: "No report ID found." });
  }

  try {
    const sessionReport = await SessionReport.findById({ _id: reportId });

    if (!sessionReport) {
      return res.status(404).json({ error: "Session report not found" });
    }

    if (!sessionReport.quiz || !sessionReport.quiz.details) {
      return res.status(404).json({ error: "Quiz details not found" });
    }

    const quizDetails = sessionReport.quiz.details;

    const mcqDetails = quizDetails.filter((q) => {
      return q.question_type === "MCQ";
    });

    const tfDetails = quizDetails.filter((q) => {
      return q.question_type === "T/F";
    });

    const response = {
      quiz_score: sessionReport.quiz.score,
      quiz_details: {
        MCQ: mcqDetails,
        TF: tfDetails,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

const addSessionReport = async (req, res) => {
  const {
    user_id,
    module_id,
    module_name,
    session_id,
    device_name,
    total_word_count,
    total_time,
    talking_time,
    total_score,
    audio_url,
    transcription,
    quiz,
    parameters,
  } = req.body;

  if (!user_id || !module_id) {
    return res.status(400).json({ error: "User ID and Module ID are required." });
  }

  try {
    const newUserId = mongoose.Types.ObjectId.createFromHexString(user_id);
    const newModuleId = mongoose.Types.ObjectId.createFromHexString(module_id);

    const user = await User.findById(newUserId);
    if (!user) {
      return res.status(404).json({ message: "Could not find user!" });
    }

    const module = await Module.findById(newModuleId);
    if (!module) {
      return res.status(404).json({ message: "Could not find module!" });
    }

    if (module.name !== module_name) {
      return res.status(404).json({ message: "Module ID and module name do not match!" });
    }

    const assignedModule = user.assigned_modules.find(
      (m) => m.module_id.toString() === newModuleId.toString()
    );

    if (!assignedModule) {
      return res.status(404).json({ message: "Module not assigned to user!" });
    }

    const latestSession = await SessionReport.findOne({
      user_id: newUserId,
      module_id: newModuleId,
    }).sort({ session_count: -1 });

    const newSessionCount = latestSession ? latestSession.session_count + 1 : 1;

    const newSessionReport = new SessionReport({
      user_id: newUserId,
      module_id: newModuleId,
      module_name,
      session_id,
      session_count: newSessionCount,
      device_name,
      total_word_count,
      total_time,
      talking_time,
      total_score,
      audio_url,
      transcription,
      quiz,
      parameters,
    });

    // const savedReport = await newSessionReport.save();
    // await newSessionReport.save();


    // Update sessions_completed and average_score in assigned_modules
    assignedModule.sessions_completed = newSessionCount;
    assignedModule.average_score = assignedModule.average_score
      ? (assignedModule.average_score + total_score) / 2
      : total_score;

    // Check completion criteria
    const { completion_criteria } = module;
    if (completion_criteria.number_of_sessions && newSessionCount >= completion_criteria.number_of_sessions && assignedModule.is_completed == false) {
      assignedModule.is_completed = true;
      assignedModule.completed_date = new Date();
    } else if (completion_criteria.cumulative_score && total_score >= completion_criteria.cumulative_score && assignedModule.is_completed == false) {
      assignedModule.is_completed = true;
      assignedModule.completed_date = new Date();
    }

    // await user.save();

    res.status(201).json({ message: "Session report successfully not added!" });
  } catch (err) {
    res.status(400).json({ error: `Failed to add session report: ${err.message}` });
  }
};

module.exports = {
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
  getQuizDetails,
  addSessionReport,
};
