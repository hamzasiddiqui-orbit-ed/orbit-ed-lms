const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course_Category",
    },
    description: String,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image_url: String,
    coach: {
      monologue: String,
      audio_url: String,
    },
    gpt_prompts: {
      coach_prompt: String,
      character_prompt: String,
      evaluation_prompt: String,
    },
    parameters: [mongoose.Schema.Types.ObjectId],
    question_pool: [
      {
        question_type: {
          type: String,
          required: true,
          enum: ["MCQ", "T/F", "open-ended"],
        },
        question_text: {
          type: String,
          required: true,
        },
        options: [String],
        correct_option: String,
        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
        },
      },
    ],
    take_quiz: Boolean,
    quiz: {
      parameters: {
        number_of_questions: Number,
        easy_percentage: Number,
        medium_percentage: Number,
        hard_percentage: Number,
      },
    },
    completion_criteria: {
      number_of_sessions: Number,
      cumulative_score: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Module", moduleSchema);
