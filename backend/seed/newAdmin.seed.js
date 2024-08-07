const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/user.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const user = new User({
      username: "tester",
      password: "password",
      pin: "1234",
      email: "tester@email.com",
      name: "Tester",
      phone: "03333333333",
      job_title: "Manager",
      description: "Administer stuff.",
      profile_pic: null,
      user_type: "Admin",
      organization_id: "668281bdb6dd30385357e088",
      assigned_manager: null,
      assigned_modules: {
        module_id: null,
        due_date: null,
        sessions_completed: null,
        cumulative_score: null,
        is_completed: null,
      },
      first_login: true,
    });

    console.log('about to save.');
    await user.save();

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

importData();
