const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const CourseCategory = require("../models/courseCategory.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const courseCategory = new CourseCategory({
      name: "Emotional Intelligence",
      description: "Enhance your emotaional intelligence.",
      tags: ["communication", "emotional", "intelligence"],
    });

    console.log('about to save.');
    await courseCategory.save();

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
