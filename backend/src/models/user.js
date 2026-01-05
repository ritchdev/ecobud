// const mongoose = require('mongoose');
import { mongoose } from "mongoose" 

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  completedLearningItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningItem",
    }
  ],
  certificates: [
    {
      type: String,
      enum: [
        "RECYCLING_BASICS",
        "PLASTIC_&_EWASTE",
        "SUSTAINABLE_LIVING"
      ]
    }
  ],
  loginStreak: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

export const User = mongoose.model('User', userSchema)
