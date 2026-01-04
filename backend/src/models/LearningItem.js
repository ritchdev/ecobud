const learningItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "article"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  }
});

export const LearningItem = mongoose.model(
  "LearningItem",
  learningItemSchema
);
