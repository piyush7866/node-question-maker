const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  answer: {
    type: String,
    required: [true, "must provide"],
    trim: true,
    maxlength: [30, "answer cannot be more that 30 characters"],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
