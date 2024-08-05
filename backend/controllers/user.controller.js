const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const Module = require("../models/module.model");
const CourseCategory = require("../models/courseCategory.model");

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

// Login function for LMS frontend app
const authUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("authUser called: ", username, password);

  if (!username || !password) {
    return res.status(400).json({ message: "Required data missing!"});
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Please enter a valid username" });
  }

  if (user && (await user.matchPassword(password))) {
    res.cookie("jwt", generateToken(user._id), {
      httpOnly: true,
      // Only secure cookies in production mode
      secure: process.env.NODE_ENV !== "development",
      // Prevent CSRF attacks
      sameSite: "Strict",
      // Max age = 24 hours
      maxAge: 24 * 60 * 60 * 1000,
    });

    var total_sessions_taken = 0;

    user.assigned_modules.map((m) => {
      total_sessions_taken = total_sessions_taken + m.sessions_completed;
    })

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      job_title: user.job_title,
      description: user.description,
      user_type: user.user_type,
      organization_id: user.organization_id,
      assigned_manager: user.assigned_manager,
      assigned_modules: user.assigned_modules,
      total_sessions_taken: total_sessions_taken,
    });
  } else {
    return res.status(401).json({ message: "Password is incorrect" });
  }
};

// Login function for Unreal app
const unrealAuthUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(`\nunrealAuthUser called: ${(username, password)}\n`);

  if (!username || !password) {
    return res.status(400).json({ message: "Required data missing!"});
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Please enter a valid username" });
  }

  if (user && (await user.matchPassword(password))) {
    res.cookie("jwt", generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3 * 60 * 60 * 1000,
    });

    const assignedModules = await Promise.all(
      user.assigned_modules.map(async (assignedModule) => {
        const module = await Module.findById(assignedModule.module_id).populate(
          "category_id"
        );

        if (!module) {
          return null;
        }

        const category = module.category_id
          ? await CourseCategory.findById(module.category_id)
          : null;

        return {
          module_id: module._id,
          name: module.name,
          description: module.description,
          image_url: module.image_url,
          category_id: category ? category._id : null,
          category_name: category ? category.name : null,
          category_description: category ? category.description : null,
          category_tags: category ? category.tags : null,
          is_completed: assignedModule.is_completed,
        };
      })
    );

    const categorizedModules = assignedModules.reduce((acc, module) => {
      if (!module) return acc;

      const categoryKey = module.category_id || "uncategorized";

      if (!acc[categoryKey]) {
        acc[categoryKey] = {
          category_id: module.category_id,
          category_name: module.category_name,
          category_description: module.category_description,
          category_tags: module.category_tags,
          modules: [],
        };
      }

      acc[categoryKey].modules.push({
        module_id: module.module_id,
        name: module.name,
        description: module.description,
        image_url: module.image_url,
        is_completed: module.is_completed,
      });

      return acc;
    }, {});

    const categorizedModulesArray = Object.keys(categorizedModules).map(key => ({
      category_id: categorizedModules[key].category_id,
      category_name: categorizedModules[key].category_name,
      category_description: categorizedModules[key].category_description,
      category_tags: categorizedModules[key].category_tags,
      modules: categorizedModules[key].modules,
    }));

    res.json({
      user_id: user._id,
      username: user.username,
      user_full_name: user.name,
      user_email: user.email,
      assigned_modules: categorizedModulesArray,
    });
  } else {
    return res.status(401).json({ message: "Password is incorrect" });
  }
};


const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    // Expire the cookie
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { authUser, unrealAuthUser, logoutUser };
