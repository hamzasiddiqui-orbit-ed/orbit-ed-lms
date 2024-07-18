const dotenv = require("dotenv");
const connectDB = require("../config/db");
const SessionReport = require("../models/sessionReport.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const sessionReport = new SessionReport({
      user_id: "66828d7be72b779d4c60cd21",
      module_name: "Conflict Resolution",
      session_count: 1,
      device_name: "Occulus",
      total_word_count: 71,
      total_time: 87,
      total_score: 68,
      audio_url: null,
      transcription:
        "footprints in the snow have been unfailing provokers of sentiment ever since snow was first a white wonder in this drabcolored world of ours in a poetry book presented to one of our us by and on there was a poem by one wordsworth in which they stood out strongly with a picture all to themselves 2 but we didnt think very high either of the poem or of the sentiment footprints in the sand now were clear quite matter and we grasped crusoes attitude of mind much more easily than wordsworth excitement and mystery curiosity and suspense these were the only sentiments that tracks whether in sand or in snow were able to arouse in us",
      quiz_score: [
        {
          question_id: "66828b6f44dc507fe8f2f0bf",
          score: 1,
        },
        {
          question_id: "66828b6f44dc507fe8f2f0c1",
          score: 0,
        },
      ],
      parameters: {
        base: {
          pitch: {
            score: 0,
            mean: 0.01,
            list: [0.023, 0.04, 0.06],
          },
          loudness: {
            score: 44,
            mean: 59.1,
            list: [69.9, 71.3, 70.2],
          },
          repetitive_words: {
            score: 71.3,
            count: 0,
            list: [],
          },
          filler_sounds: {
            score: 49.9,
            count: 0,
            list: [],
          },
          pauses: {
            time: 7.12,
            bad_count: 2,
            total_count: 5,
            score: 97.2,
          },
          clarity: {
            mean: 37,
            score: 93,
          },
          wpm: {
            mean: 41,
            score: 78,
          },
          eye_contact: {
            left_split: 9,
            right_split: 0,
            score: 2.440537,
            avatars: [
              {
                name: "Hassan A.",
                total_contact: 1.323029,
                quality_contact: 0.5456051,
                avg_contact_len: 0.8247817,
              },
              {
                name: "Sana S.",
                total_contact: 1.199012,
                quality_contact: 0.4585415,
                avg_contact_len: 1.529731,
              },
            ],
          },
        },
        derived: {
          persuasion: 39.8,
          confidence: 41.1,
          authenticity: 30.5,
          collaboration: 34.9,
          engagement: 58.3,
          performance: 49.8,
          preparation: 27.9
        },
      },
    });

    console.log("about to save.");
    await sessionReport.save();

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
