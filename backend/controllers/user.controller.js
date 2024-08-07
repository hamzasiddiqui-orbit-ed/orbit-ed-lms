const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const Module = require("../models/module.model");
const CourseCategory = require("../models/courseCategory.model");
const Organization = require("../models/organization.model");

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const generateTokenForUnreal = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY_UNREAL, {
    expiresIn: "24h",
  });
};

const formatDate = (date) => {
  if (!date) {
    return null;
  }

  const options = { day: "numeric", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};

// -----------------------------------
// Login function for LMS frontend app
// -----------------------------------
const authUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("authUser called: ", username, password);

  if (!username || !password) {
    return res.status(400).json({ message: "Required data missing!" });
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
    });

    const userOrganization = await Organization.findById(user.organization_id, {
      name: 1,
    });

    if (user.user_type != "Admin") {
      const userManager = await User.findById(user.assigned_manager, {
        name: 1,
      });

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        gender: user.gender,
        country: user.country,
        phone: user.phone,
        job_title: user.job_title,
        description: user.description,
        user_type: user.user_type,
        organization: userOrganization.name,
        assigned_manager: userManager.name,
        assigned_modules: user.assigned_modules,
        total_sessions_taken: total_sessions_taken,
        createdAt: formatDate(user.createdAt),
      });
    } else {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        gender: user.gender,
        country: user.country,
        phone: user.phone,
        job_title: user.job_title,
        description: user.description,
        user_type: user.user_type,
        organization: userOrganization.name,
        assigned_modules: user.assigned_modules,
        total_sessions_taken: total_sessions_taken,
        createdAt: formatDate(user.createdAt),
      });
    }
  } else {
    return res.status(401).json({ message: "Password is incorrect" });
  }
};

// -----------------------------
// Login function for Unreal app
// -----------------------------
const unrealAuthUser = async (req, res) => {
  const { username, pin } = req.body;
  console.log(`\nunrealAuthUser called: ${(username, pin)}\n`);

  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

  if (!username || !pin) {
    return res.status(400).json({ message: "Required data missing!" });
  } else if (pin.length != 4) {
    return res.status(400).json({ message: "Length of pin should be 4." });
  } else if (!isNumeric(pin)) {
    return res.status(400).json({ message: "Pin should be numeric." });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Please enter a valid username" });
  }

  if (user && (await user.matchPin(pin))) {
    res.cookie("jwt", generateTokenForUnreal(user._id), {
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

    const categorizedModulesArray = Object.keys(categorizedModules).map(
      (key) => ({
        category_id: categorizedModules[key].category_id,
        category_name: categorizedModules[key].category_name,
        category_description: categorizedModules[key].category_description,
        category_tags: categorizedModules[key].category_tags,
        modules: categorizedModules[key].modules,
      })
    );

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

// --------------------------
// Logout user and expire JWT
// --------------------------
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    // Expire the cookie
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// ---------------------------
// Update user profile details
// ---------------------------
const updateUserProfile = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;

  const { name, gender, country, jobTitle, phone, description } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "No user ID found." });
  } else if (!name || !gender || !country || !jobTitle || !phone || !description) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    // Find the user and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        gender,
        country,
        job_title: jobTitle,
        phone,
        description,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user info (excluding sensitive data)
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        gender: updatedUser.gender,
        country: updatedUser.country,
        phone: updatedUser.phone,
        job_title: updatedUser.job_title,
        description: updatedUser.description,
      },
    });
  } catch (err) {
    res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ----------------------
// Update user's password
// ----------------------
const changePassword = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required." });
    } else if (currentPassword == newPassword) {
      return res.status(400).json({
        message: "New password should be different from the current password.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password is correct using the matchPassword method
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Check if the new password meets the required criteria
    if (newPassword.length < 4) {
      return res
        .status(400)
        .json({ message: "New password must be at least 4 characters long." });
    }

    // Set the new password
    user.password = newPassword;

    // Save the user (this will trigger the pre-save hook to hash the password)
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ------------------------
// Update user's unreal pin
// ------------------------
const changePin = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).id;

    const { currentPin, newPin } = req.body;

    console.log(currentPin, typeof currentPin);
    console.log(newPin, typeof newPin);

    if (!currentPin || !newPin) {
      return res
        .status(400)
        .json({ message: "Current pin and new pin are required." });
    } else if (currentPin == newPin) {
      return res.status(400).json({
        message: "New pin should be different from the current password.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password is correct using the matchPassword method
    const isMatch = await user.matchPin(currentPin);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current pin is incorrect." });
    }

    // Check if the new password meets the required criteria
    if (newPin.length != 4) {
      return res
        .status(400)
        .json({ message: "New pin must be of 4 digits." });
    }

    // Set the new password
    user.pin = newPin;

    // Save the user (this will trigger the pre-save hook to hash the password)
    await user.save();

    res.status(200).json({ message: "Pin changed successfully." });
  } catch (err) {
    res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

module.exports = {
  authUser,
  unrealAuthUser,
  logoutUser,
  updateUserProfile,
  changePassword,
  changePin,
};
