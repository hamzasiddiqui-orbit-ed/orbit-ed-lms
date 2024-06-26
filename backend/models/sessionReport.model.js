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
    device_name: String,
    total_word_count: Number,
    total_time: Number,
    total_score: Number,
    audio_url: String,
    transcription: String,
    quiz_score: [
      {
        question_id: mongoose.Schema.Types.ObjectId,
        score: Number,
      },
    ],
    parameters: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sessionReport", sessionReportSchema);
