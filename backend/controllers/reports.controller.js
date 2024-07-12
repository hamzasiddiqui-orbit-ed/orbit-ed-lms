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
      .json("ERROR: Something went wrong, could not find user ID.");
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
    var query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      module_name: module_name,
      session_count: session_count,
    };

    try {
      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  } else if (user_id && module_name) {
    var query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      module_name: module_name,
    };

    try {
      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  } else {
    var query = {
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
    };

    try {
      var result = await SessionReport.findOne(query, null, options);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  console.log(result);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json("ERROR 404: No report found");
  }
};

// Gets Unique module names for user's session reports
const getUniqueModulesFromReports = async (req, res) => {
  const user_id = req.body.user_id;

  if (!user_id) {
    return res.status(400).json("ERROR: No user Id found.");
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
  };

  var projection = {
    module_name: 1,
  };

  var options = {
    sort: { createdAt: -1 },
    limit: 5,
  };

  try {
    const result = await SessionReport.find(
      query,
      projection,
      options
    ).distinct("module_name");

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("ERROR 404: No report found");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

// Gets 5 latest session counts for user reports according to module name
const getModuleSessionsFromReport = async (req, res) => {
  const user_id = req.body.user_id;
  const module_name = req.body.module_name;

  if (!user_id || !module_name) {
    return res
      .status(400)
      .json(
        "ERROR: Something went wrong. Could not retreive user Id or module"
      );
  }

  var query = {
    user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
    module_name: module_name,
  };

  var projection = {
    session_count: 1,
  };

  var options = {
    sort: { createdAt: -1 },
    limit: 5,
  };

  try {
    const result = await SessionReport.find(query, projection, options).distinct("session_count");

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("ERROR 404: No report found");
    }
  } catch (err) {
    return res.status(400).json(err.message);
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
    return res.status(400).json(err.message);
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
