const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Parameter = require("../models/parameter.model");
const connectDB = require("../config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const parameters = [
      {
        name: "persuasion",
        base_parameters: ["pitch", "clarity", "eye_contact"]
      },
      {
        name: "confidence",
        base_parameters: ["wpm", "clarity", "eye_contact", "repititive_words"],
      },
      {
        name: "authenticity",
        base_parameters: ["wpm", "pauses", "repititive_words"],
      },
      {
        name: "collaboration",
        base_parameters: ["eye_contact", "loudness", "pauses"],
      },
      {
        name: "engagement",
        base_parameters: ["eye_contact", "pitch", "filler_sounds"]
      },
      {
        name: "performance",
        base_parameters: ["wpm", "filler_sounds", "pauses", "clarity"],
      },
      {
        name: "persuasion",
        base_parameters: ["eye_contact", "pitch", "clarity", "loudness"]
      },
    ];

    console.log("about to save.");
    await Parameter.insertMany(parameters);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
