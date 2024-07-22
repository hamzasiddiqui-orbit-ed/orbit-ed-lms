const mongoose = require("mongoose");
const Module = require("../models/module.model");

// Helper function to get random elements from an array
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to calculate the number of questions per difficulty level
function calculateQuestionCount(totalQuestions, percentage) {
  return Math.round((totalQuestions * percentage) / 100);
}

// --------------------------------------------------------------------------------------
// Get the module details for the Unreal App after receiving the session_Id and module_Id
// --------------------------------------------------------------------------------------
const getSessionModule = async (req, res) => {
  try {
    const moduleId = req.body.module_id;
    const sessionId = req.body.session_id;

    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(moduleId),
    };

    const module = await Module.findById(query);

    console.log(module);

    if (!module) {
      return res.status(404).json({ message: "Module not found." });
    }

    if (!sessionId) {
      return res.status(404).json({ message: "Session ID not found!." });
    }

    const {
      number_of_questions,
      easy_percentage,
      medium_percentage,
      hard_percentage,
    } = module.quiz.parameters;

    // Calculate the number of questions for each difficulty level
    let easyCount = calculateQuestionCount(
      number_of_questions,
      easy_percentage
    );
    let mediumCount = calculateQuestionCount(
      number_of_questions,
      medium_percentage
    );
    let hardCount = calculateQuestionCount(
      number_of_questions,
      hard_percentage
    );

    // Adjust the counts to ensure the total matches the required number_of_questions
    let totalAssigned = easyCount + mediumCount + hardCount;
    if (totalAssigned > number_of_questions) {
      const excess = totalAssigned - number_of_questions;
      if (easyCount >= excess) {
        easyCount -= excess;
      } else if (mediumCount >= excess) {
        mediumCount -= excess;
      } else {
        hardCount -= excess;
      }
    } else if (totalAssigned < number_of_questions) {
      const deficit = number_of_questions - totalAssigned;
      if (easyCount + deficit <= number_of_questions) {
        easyCount += deficit;
      } else if (mediumCount + deficit <= number_of_questions) {
        mediumCount += deficit;
      } else {
        hardCount += deficit;
      }
    }

    // Separate questions by difficulty
    const easyQuestions = module.question_pool.filter(
      (q) => q.difficulty === "easy"
    );
    const mediumQuestions = module.question_pool.filter(
      (q) => q.difficulty === "medium"
    );
    const hardQuestions = module.question_pool.filter(
      (q) => q.difficulty === "hard"
    );

    // Select random questions for each difficulty level
    const selectedEasyQuestions = getRandomElements(easyQuestions, easyCount);
    const selectedMediumQuestions = getRandomElements(
      mediumQuestions,
      mediumCount
    );
    const selectedHardQuestions = getRandomElements(hardQuestions, hardCount);

    // Combine selected questions
    const selectedQuestions = [
      ...selectedEasyQuestions,
      ...selectedMediumQuestions,
      ...selectedHardQuestions,
    ];

    // Format the response
    const response = {
      coach: {
        monologue: module.coach.monologue,
        audio_url: module.coach.audio_url,
      },
      gpt_prompts: {
        coach_prompt: module.gpt_prompts.coach_prompt,
        character_prompt: module.gpt_prompts.character_prompt,
        evaluation_prompt: module.gpt_prompts.evaluation_prompt,
      },
      quiz: selectedQuestions.map((q) => ({
        question_Id: q._id,
        question_type: q.question_type,
        question_text: q.question_text,
        options: q.options,
        correct_option: q.correct_option,
        difficulty: q.difficulty,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSessionModule,
};
