const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Module = require("../models/module.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const module = new Module({
      name: "Conflict Resolution",
      description: "Orbit-Ed's third test course for development",
      organizationId: "668281bdb6dd30385357e088",
      category_id: "6694fa1c4d6de95c29c8f2f0",
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
        "668288b9f70f2bf97ff7e048",
      ],
      question_pool: [
        {
          question_type: "MCQ",
          question_text: "What is emotional intelligence?",
          options: [
            "The ability to understand and manage emotions",
            "The ability to solve complex mathematical problems",
            "The ability to memorize large amounts of information",
            "The ability to speak multiple languages",
          ],
          correct_option: "The ability to understand and manage emotions",
          difficulty: "easy",
        },
        {
          question_type: "T/F",
          question_text:
            "Self-awareness is a key component of emotional intelligence.",
          options: ["True", "False"],
          correct_option: "True",
          difficulty: "medium",
        },
        {
          question_type: "MCQ",
          question_text:
            "Which of the following is NOT one of the five components of emotional intelligence according to Daniel Goleman?",
          options: [
            "Self-regulation",
            "Motivation",
            "Empathy",
            "Critical thinking",
          ],
          correct_option: "Critical thinking",
          difficulty: "hard",
        },
        {
          question_type: "MCQ",
          question_text:
            "What does 'empathy' refer to in emotional intelligence?",
          options: [
            "The ability to understand and share the feelings of others",
            "The ability to control one's own emotions",
            "The ability to motivate oneself",
            "The ability to recognize one's own emotions",
          ],
          correct_option:
            "The ability to understand and share the feelings of others",
          difficulty: "medium",
        },
        {
          question_type: "T/F",
          question_text:
            "Emotional intelligence can be improved over time with practice and effort.",
          options: ["True", "False"],
          correct_option: "True",
          difficulty: "easy",
        },
        {
          question_type: "MCQ",
          question_text:
            "Which of these is an example of practicing emotional intelligence in the workplace?",
          options: [
            "Actively listening to a colleague's concerns",
            "Ignoring conflicts to avoid confrontation",
            "Making decisions based solely on logic",
            "Expressing anger when things don't go as planned",
          ],
          correct_option: "Actively listening to a colleague's concerns",
          difficulty: "medium",
        },
        {
          question_type: "MCQ",
          question_text:
            "What is 'social awareness' in the context of emotional intelligence?",
          options: [
            "The ability to recognize and understand others' emotions",
            "The ability to influence others' emotions",
            "The ability to control one's own emotions",
            "The ability to avoid social situations",
          ],
          correct_option:
            "The ability to recognize and understand others' emotions",
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
