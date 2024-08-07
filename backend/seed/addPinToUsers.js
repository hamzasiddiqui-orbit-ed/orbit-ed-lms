const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const connectDB = require("../config/db");

connectDB();

async function setDefaultPin() {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash("1234", salt);

    const result = await User.updateMany(
      { pin: { $exists: false } },
      { $set: { pin: hashedPin } }
    );

    console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error('Error updating pins:', error);
  } finally {
    mongoose.connection.close();
  }
}

setDefaultPin();
