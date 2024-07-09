const dotenv = require("dotenv");
const connectDB = require("../config/db");
const SessionReport = require("../models/sessionReport.model");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const sessionReport = new SessionReport({
      user_id: "66828d7be72b779d4c60cd21",
      module_name: "Communication-101 Test",
      session_count: 2,
      device_name: "Occulus",
      total_word_count: 63,
      total_time: 79,
      total_score: 69,
      audio_url: null,
      tanscription:
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
            mean: 0.02,
            list: [0.023, 0.04, 0.06],
          },
          loudness: {
            score: 76,
            mean: 63.4,
            list: [69.9, 71.3, 70.2],
          },
          repetitive_words: {
            score: 74.2,
            count: 0,
            list: [],
          },
          filler_sounds: {
            score: 53.9,
            count: 0,
            list: [],
          },
          pauses: {
            time: 8.87,
            bad_count: 4,
            total_count: 8,
            score: 95.2,
          },
          clarity: {
            mean: 31,
            score: 92,
          },
          wpm: {
            mean: 39,
            score: 79,
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
          persuasion: 33.5,
          confidence: 29.8,
          authenticity: 26.3,
          engagement: 51.7,
          performance: 31.2,
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
