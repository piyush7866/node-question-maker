const Question = require("../models/question-model");
const getAllQuestion = async (req, res) => {
  try {
    const question = await Question.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    res.status(200).json({ question });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const question = await Question.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json({ question });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getQuestion = async (req, res) => {
  try {
    const { id: questionID } = req.params;
    const question = await Question.findById({ _id: questionID }).populate(
      "owner"
    );
    if (!question) {
      res.status(404).json({ msg: "Question not exist" });
    } else {
      res.status(200).json({ question });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const { id: questionID } = req.params;
    const question = await Question.findById({ _id: questionID });
    if (!question) {
      res.status(404).json({ msg: "Question doesn't exsist" });
    }
    question.delete();
    res.status(200).json({ msg: "Question deleted" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const updateQuestion = async (req, res) => {
  try {
    let updatedQuestion;
    const { id: questionID } = req.params;
    const updatingQuestion = await Question.findById({ _id: questionID });
    if (!updatingQuestion) {
      res.status(404).json({ msg: "Question doesn't exist" });
    }
    updatedQuestion = { ...req.body };
    const question = await Question.findByIdAndUpdate(
      { _id: questionID },
      updatedQuestion,
      { new: true }
    );
    res.status(200).json({ question });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  getAllQuestion,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
