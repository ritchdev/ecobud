const mongoose = require('mongoose');

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
  certicates: [
    {
      type: String,
      enum: [
        "RECYCLING_BASICS",
        "PLASTIC_&_EWASTE",
        "SUSTAINABLE LIVING"
      ]
    }
  ],
  completedTraining: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
