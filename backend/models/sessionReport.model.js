const mongoose = require("mongoose");

const sessionReportSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module_name: {
      type: String,
      required: true,
    },
    session_count: Number,
    device_name: String,
    total_word_count: Number,
    total_time: Number,
    total_score: Number,
    audio_url: String,
    transcription: String,
    quiz: {
      score: Number,
      details: [
        {
          question_type: String,
          question_text: String,
          options: [String],
          correct_option: String,
          selected_option: String,
        },
      ],
    },
    parameters: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sessionReport", sessionReportSchema);
