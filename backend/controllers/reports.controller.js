const SessionReport = require("../models/sessionReport.model");
const mongoose = require("mongoose");

const getUserReports = async (req, res) => {
  const user_id = req.body._id;

  if (!user_id) {
    res.status(400).json("No userId provided!");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
  };

  var projection = {
    module_name: 1.0,
    total_score: 1.0,
    total_time: 1.0,
    createdAt: 1.0,
  };

  try {
    var result = await SessionReport.find(query, projection);

    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("No session reports found.");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getUserReport = async (req, res) => {
  const report_id = req.body._id;

  if (!report_id) {
    res.status(400).json("No reportId provided.");
  }

  var query = {
    _id: mongoose.Types.ObjectId.createFromHexString(report_id),
  };

  try {
    var result = await SessionReport.find(query);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("No report found.");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getMostRecentUserReport = async (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    res.status(400).json("User authentication failed.");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id)
  }

  var options = {
    sort: { createdAt: -1 },
    limit: 1,
  };

  try {
    var result = await SessionReport.find(query).sort(options.sort).limit(options.limit);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("No report found");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getUserReportsDetailed = async (req, res) => {
  const user_id = req.body._id;

  if (!user_id) {
    res.status(400).json("No userId provided!");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
  };

  try {
    var result = await SessionReport.find(query);
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("No session reports found.");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { getUserReports, getUserReport, getMostRecentUserReport, getUserReportsDetailed };
