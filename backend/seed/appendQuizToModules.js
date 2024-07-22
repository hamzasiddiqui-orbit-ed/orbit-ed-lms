const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Module = require("../models/module.model");

dotenv.config();

connectDB();

// List of sample questions related to communication and behavior
const sampleQuestions = [
    {
        question_type: "T/F",
        question_text: "Speaking is when someone is yelling while giving a presentation.",
        options: ["True", "False"],
        correct_option: "False",
        difficulty: "medium"
    },
    {
        question_type: "T/F",
        question_text: "Communication skills are a tool for helping with communication barriers.",
        options: ["True", "False"],
        correct_option: "True",
        difficulty: "hard"
    },
    {
        question_type: "T/F",
        question_text: "Eye-contact is when you look down on someone while they are talking.",
        options: ["True", "False"],
        correct_option: "False",
        difficulty: "medium"
    },
    {
        question_type: "T/F",
        question_text: "Advice is good to give someone when they are in the middle of talking about their feelings",
        options: ["True", "False"],
        correct_option: "False",
        difficulty: "hard"
    },
    {
        question_type: "T/F",
        question_text: "People need to know how to communicate on the job effectively.",
        options: ["True", "False"],
        correct_option: "True",
        difficulty: "easy"
    },
    {
        question_type: "T/F",
        question_text: "A public speaker is a person who likes to talk in front of other people.",
        options: ["True", "False"],
        correct_option: "True",
        difficulty: "easy"
    },
    {
        question_type: "T/F",
        question_text: "Talking to each other to sort out problems is a good way of communicating.",
        options: ["True", "False"],
        correct_option: "True",
        difficulty: "medium"
    },
    {
        question_type: "T/F",
        question_text: "Feedback is an unnecessary part of the communication process, especially in a professional setting.",
        options: ["True", "False"],
        correct_option: "False",
        difficulty: "hard"
    },
    {
        question_type: "T/F",
        question_text: "Effective communication is important in the workplace.",
        options: ["True", "False"],
        correct_option: "True",
        difficulty: "easy"
    },
    {
        question_type: "T/F",
        question_text: "When people are having a discussion they are not talking.",
        options: ["True", "False"],
        correct_option: "False",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "Which of the following is an example of a soft skill?",
        options: ["Coding in Python", "Problem-solving", "Operating heavy machinery", "Data analysis"],
        correct_option: "Problem-solving",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "Why are soft skills important in the workplace?",
        options: ["They are not essential for career success.", "They contribute to a positive work environment and enhance teamwork.", "Soft skills are only relevant for leadership positions.", "Soft skills are not transferable to different job roles."],
        correct_option: "They contribute to a positive work environment and enhance teamwork.",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Which soft skill refers to the ability to convey information effectively and listen actively to others?",
        options: ["Creativity", "Emotional intelligence", "Communication", "Time management"],
        correct_option: "Communication",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "Which soft skill involves the capability to adjust to changing circumstances and embrace new challenges?",
        options: ["Adaptability", "Emotional intelligence", "Leadership", "Time management"],
        correct_option: "Adaptability",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "What soft skill involves the capacity to influence and guide others toward shared goals?",
        options: ["Adaptability", "Emotional intelligence", "Leadership", "Communication"],
        correct_option: "Leadership",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Which soft skill is crucial for effectively managing and resolving disagreements or disputes?",
        options: ["Conflict resolution", "Emotional intelligence", "Leadership", "Communication"],
        correct_option: "Conflict resolution",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "What soft skill involves the capability to think innovatively and generate original ideas and solutions?",
        options: ["Conflict resolution", "Emotional intelligence", "Creativity", "Communication"],
        correct_option: "Creativity",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "What soft skill involves the skill of making informed and effective decisions based on available information?",
        options: ["Decision making", "Emotional intelligence", "Creativity", "Communication"],
        correct_option: "Decision making",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "Which soft skill involves the capability to manage and resolve disagreements or conflicts constructively?",
        options: ["Decision making", "Emotional intelligence", "Creativity", "Conflict resolution"],
        correct_option: "Conflict resolution",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "What soft skill involves the capability to adjust to changing circumstances and embrace new challenges?",
        options: ["Decision making", "Adaptability", "Creativity", "Leadership"],
        correct_option: "Adaptability",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "What is the role of leadership as a soft skill?",
        options: ["Leadership involves following established rules and guidelines.", "Leadership fosters effective communication and collaboration in teams.", "Leadership has no impact on team dynamics.", "Leadership involves influencing and guiding others toward shared goals."],
        correct_option: "Leadership involves influencing and guiding others toward shared goals.",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "Why do employers value candidates with strong soft skills?",
        options: ["Soft skills are not essential for career success.", "Soft skills contribute to a negative work environment.", "Soft skills enhance teamwork and productivity.", "Soft skills are only needed in creative fields."],
        correct_option: "Soft skills enhance teamwork and productivity.",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Types of words used for verbal communication?",
        options: ["Acronyms", "Simple", "Technical", "Jargons"],
        correct_option: "Simple",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "By what method we can know what the receiver understood or got the message",
        options: ["transmitting", "feedback", "message", "listening"],
        correct_option: "feedback",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "Using abbreviations in communication leads to which type of communication barrier",
        options: ["Language", "Physical", "message", "Organisational"],
        correct_option: "Language",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "which can be used to overcome the communication barrier",
        options: ["Using a translator", "Not communicating at all", "Using your own language", "By writing a letter"],
        correct_option: "Using a translator",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Straight body posture shows what?",
        options: ["Pride", "Professionalism", "Confidence", "Humility"],
        correct_option: "Confidence",
        difficulty: "easy"
    },
    {
        question_type: "MCQ",
        question_text: "Sending a letter is which type of communication?",
        options: ["Listening", "Writing", "Speaking", "Reading"],
        correct_option: "Writing",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Which of the following is not an element of the communication cycle?",
        options: ["Channel", "Receiver", "Time", "Sender"],
        correct_option: "Time",
        difficulty: "hard"
    },
    {
        question_type: "MCQ",
        question_text: "Written communication can be classified in which type of communication?",
        options: ["Verbal", "Professionalism", "Visual", "Non-verbal"],
        correct_option: "Non-verbal",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Which of the following is an example of negative feedback?",
        options: ["You can dance better.", "Your Dance was good but you can do better.", "Your Dance skill is not really good. You have to practise more.", "None of the above"],
        correct_option: "Your Dance skill is not really good. You have to practise more.",
        difficulty: "medium"
    },
    {
        question_type: "MCQ",
        question_text: "Which of the following is quick and clear method of communication",
        options: ["e-mail", "notices/posters", "face-to-face informal communication", "business meetings"],
        correct_option: "face-to-face informal communication",
        difficulty: "easy"
    },
];

// Helper function to generate a unique ObjectId
const generateObjectId = () => new mongoose.Types.ObjectId();

// Function to append questions to the question_pool of each module
const appendQuestionsToModules = async () => {
    try {
        const modules = await Module.find();
        for (let module of modules) {
            // Create 44 questions with unique ObjectId
            const newQuestions = sampleQuestions.map(question => ({
                ...question,
                _id: generateObjectId()
            }));

            // Update the module's question_pool
            module.question_pool = [...module.question_pool, ...newQuestions];
            await module.save();
        }
        console.log("Questions appended to all modules successfully");
    } catch (error) {
        console.error("Error appending questions:", error);
    } finally {
        mongoose.connection.close();
    }
};

appendQuestionsToModules();