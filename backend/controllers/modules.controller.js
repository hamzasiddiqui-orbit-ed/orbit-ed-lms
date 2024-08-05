const mongoose = require("mongoose");
const Module = require("../models/module.model");
const User = require("../models/user.model");

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
  const moduleId = req.body.module_id;
  const sessionId = req.body.session_id;

  if (!moduleId) {
    return res.status(404).json({ message: "Module not found." });
  }

  if (!sessionId) {
    return res.status(404).json({ message: "Session ID not found!." });
  }

  try {
    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(moduleId),
    };

    const module = await Module.findById(query);

    console.log(module);

    if (module.take_quiz == true) {
      var {
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
      var selectedQuestions = [
        ...selectedEasyQuestions,
        ...selectedMediumQuestions,
        ...selectedHardQuestions,
      ];

      // Format the response
      var response = {
        coach: {
          monologue: module.coach.monologue,
          audio_url: module.coach.audio_url,
        },
        gpt_prompts: {
          coach_prompt: module.gpt_prompts.coach_prompt,
          character_prompt: module.gpt_prompts.character_prompt,
          evaluation_prompt: module.gpt_prompts.evaluation_prompt,
        },
        take_quiz: module.take_quiz,
        quiz: selectedQuestions.map((q) => ({
          question_Id: q._id,
          question_type: q.question_type,
          question_text: q.question_text,
          options: q.options,
          correct_option: q.correct_option,
          difficulty: q.difficulty,
        })),
      };
    } else {
      var response = {
        coach: {
          monologue: module.coach.monologue,
          audio_url: module.coach.audio_url,
        },
        gpt_prompts: {
          coach_prompt: module.gpt_prompts.coach_prompt,
          character_prompt: module.gpt_prompts.character_prompt,
          evaluation_prompt: module.gpt_prompts.evaluation_prompt,
        },
        take_quiz: module.take_quiz,
        quiz: [],
      };
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// ------------------------------------------
// Fetch Unique modules from assigned modules
// ------------------------------------------
const getUniqueAssignedModules = async (req, res) => {
  const userId = req.body.user_id;
  if (!userId) {
    return res.status(400).json({ message: "No user Id found." });
  }
  try {
    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(userId),
    };

    const user = await User.findById(query);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const assignedModuleIds = user.assigned_modules.map(mod => mod.module_id);

    const modules = await Module.find({ _id: { $in: assignedModuleIds } }).select('name');
    
    const moduleNames = modules.map(module => module.name);

    res.status(200).json(moduleNames);
  } catch (err) {
    return res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

// -----------------------------------------------------------------------------------------
// Fetch Assigned date, Completed date, Due date, Assigned by, average score of given module
// -----------------------------------------------------------------------------------------
// Utility function to format dates (move to middleware)
const formatDate = (date) => {
  if (!date) {
    return null
  }

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const getAssignedModuleDetails = async (req, res) => {
  const userId = req.body.user_id;
  const moduleName = req.body.module_name;

  if (!userId) {
    return res.status(400).json({ message: "User Id not found." });
  }
  if (!moduleName) {
    return res.status(400).json({ message: "Module name not found."});
  }

  try {
    var query = {
      _id: mongoose.Types.ObjectId.createFromHexString(userId),
    };

    // Find the user by ID
    const user = await User.findById(query);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the module by name
    const module = await Module.findOne({ name: moduleName });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Find the assigned module details in the user document
    const assignedModule = user.assigned_modules.find(m => m.module_id.toString() === module._id.toString());
    if (!assignedModule) {
      return res.status(404).json({ message: 'Assigned module not found for this user' });
    }

    // Find the assigned by user details
    const assignedByUser = await User.findById(assignedModule.assigned_by);
    if (!assignedByUser) {
      return res.status(404).json({ message: 'Assigned by user not found' });
    }

    // Prepare the response
    const response = {
      assignedDate: formatDate(assignedModule.assigned_date),
      completedDate: formatDate(assignedModule.completed_date),
      dueDate: formatDate(assignedModule.due_date),
      assignedBy: assignedByUser.name,
      averageScore: assignedModule.average_score
    };

    console.log(response);


    res.json(response);
  } catch (err) {
    res.status(400).json({ message: `Query response: ${err.message}` });
  }
};

module.exports = {
  getSessionModule,
  getUniqueAssignedModules,
  getAssignedModuleDetails,
};
