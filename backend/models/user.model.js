const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: String,
    job_title: String,
    description: String,
    profile_pic: Buffer,
    user_type: {
      type: String,
      required: true,
      enum: ["Root", "Admin", "Manager", "Learner"],
    },
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    },
    assigned_manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assigned_modules: [
      {
        module_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Module",
        },
        assigned_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        assigned_date: Date,
        due_date: Date,
        average_score: Number,
        sessions_completed: Number,
        is_completed: Boolean,
        completed_date: Date,
      },
    ],
    first_login: {
      type: Boolean,
      Required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing
userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) {
  //   next();
  // } else {
  //   const salt = await bcrypt.genSalt(10);
  //   this.password = await bcrypt.hash(this.password, salt);
  // }
  
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified("pin")) {
    const salt = await bcrypt.genSalt(10);
    this.pin = await bcrypt.hash(this.pin, salt);
  }

  next();
});

// Password matching
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// pin matching
userSchema.methods.matchPin = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

module.exports = mongoose.model("User", userSchema);
