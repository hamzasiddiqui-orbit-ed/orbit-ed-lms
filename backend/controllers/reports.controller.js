const SessionReport = require("../models/sessionReport.model");
const mongoose = require("mongoose");

// Gets user session reports with minimal details
const getUserReports = async (req, res) => {
  const user_id = req.body._id;

  if (!user_id) {
    return res.status(400).json("No userId provided!");
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
      return res.status(200).json(result);
    } else {
      return res.status(404).json("No session reports found.");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Gets user session report
const getUserReport = async (req, res) => {
  const report_id = req.body._id;

  if (!report_id) {
    return res.status(400).json("No reportId provided.");
  }

  var query = {
    _id: mongoose.Types.ObjectId.createFromHexString(report_id),
  };

  try {
    var result = await SessionReport.find(query);
    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("No report found.");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Gets most recent user session report
const getMostRecentUserReport = async (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    return res.status(400).json("User authentication failed.");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
  };

  var options = {
    sort: { createdAt: -1 },
  };

  try {
    var result = await SessionReport.findOne(query, null, options);
    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("ERROR 404: No report found");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Gets user session report with respect to module name
const getModuleReport = async (req, res) => {
  const user_id = req.body.user_id;
  const module_name = req.body.module_name;

  if (!user_id || !module_name) {
    return res
      .status(400)
      .json("Something went wrong! Unable to retreive userId or module name.");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
    module_name: module_name,
  };

  var options = {
    sort: { createdAt: -1 },
  };

  try {
    var result = await SessionReport.findOne(query, null, options);
    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("EROR 404: No report found.");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Gets user session report with respect to module name and session count
const getModuleSessionReport = async (req, res) => {
  const user_id = req.body.user_id;
  const module_name = req.body.module_name;
  const session_count = req.body.session_count;

  if (!user_id || !module_name || !session_count) {
    return res
      .status(400)
      .json(
        "Somthing went wrong! Unable to retreive userId or module name or session count."
      );
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
    module_name: module_name,
    session_count: session_count,
  };

  var options = {
    sort: { createdAt: -1 },
  };

  try {
    var result = await SessionReport.findOne(query, null, options);
    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("ERROR 404: No report found.");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Get session report for learner dashboard
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

// Gets Unique module names for user's session reports
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

// Gets 5 latest session counts for user reports according to module name
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

// Gets user session report
const getUserReportsDetailed = async (req, res) => {
  const user_id = req.body._id;

  if (!user_id) {
    return res.status(400).json("No userId provided!");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
  };

  try {
    var result = await SessionReport.find(query);
    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("No session reports found.");
    }
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

module.exports = {
  getUserReports,
  getUserReport,
  getMostRecentUserReport,
  getModuleReport,
  getModuleSessionReport,
  getSessionReport,
  getUniqueModulesFromReports,
  getModuleSessionsFromReport,
  getUserReportsDetailed,
};
