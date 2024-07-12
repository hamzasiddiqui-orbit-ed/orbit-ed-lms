const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Module = require("../models/module.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const module = new Module({
      name: "Negotiation and finding common ground",
      description: "Orbit-Ed's second test course for development",
      organizationId: "668281bdb6dd30385357e088",
      category_id: "6682868b6b1d62e769880a95",
      created_by: null,
      coach: {
        monologue: "Hello, how are you? I am the coach.",
        audio_url: null,
      },
      gpt_prompts: {
        coach_prompt: "This is the test coach prompt.",
        character_prompt: "This is the test character prompt.",
        evaluation_prompt: "This is the test evaluation prompt.",
      },
      parameters: [
        "668288b9f70f2bf97ff7e042",
        "668288b9f70f2bf97ff7e043",
        "668288b9f70f2bf97ff7e044",
        "668288b9f70f2bf97ff7e046",
        "668288b9f70f2bf97ff7e047",
      ],
      question_pool: [
        {
          question_type: "T/F",
          question_text:
            "To give a killer pitch first capture, capture info about your audience first.",
          options: ["True", "False"],
          correct_option: "True",
          difficulty: "medium",
        },
        {
          question_type: "MCQ",
          question_text: "What is communication?",
          options: [
            "A process of sharing information",
            "A way to confuse people",
            "An art form",
            "A science",
          ],
          correct_option: "A process of sharing information",
          difficulty: "easy",
        },
        {
          question_type: "MCQ",
          question_text: "Which is a key component of effective communication?",
          options: ["Clarity", "Ambiguity", "Noise", "Guesswork"],
          correct_option: "Clarity",
          difficulty: "hard",
        },
        {
          question_type: "MCQ",
          question_text: "What is verbal communication?",
          options: [
            "Communication using words",
            "Communication using body language",
            "Communication using signs",
            "Communication using silence",
          ],
          correct_option: "Communication using words",
          difficulty: "easy",
        },
        {
          question_type: "T/F",
          question_text: "Speaking is an example of verbal communication?",
          options: ["True", "False"],
          correct_option: "True",
          difficulty: "easy",
        },
        {
          question_type: "MCQ",
          question_text: "What is non-verbal communication?",
          options: [
            "Communication without words",
            "Communication using only text",
            "Communication through phone calls",
            "Communication through emails",
          ],
          correct_option: "Communication without words",
          difficulty: "medium",
        },
        {
          question_type: "MCQ",
          question_text: "Which is a form of non-verbal communication?",
          options: ["Gestures", "Talking", "Listening", "Reading"],
          correct_option: "Gestures",
          difficulty: "hard",
        },
      ],
      take_quiz: false,
      quiz: {
        parameters: {
          number_of_questions: null,
          easy_percentage: null,
          medium_percentage: null,
          hard_percentage: null,
        },
      },
      completion_criteria: {
        number_of_sessions: 5,
        cumulative_score: null,
      },
    });

    console.log("about to save.");
    await module.save();

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
