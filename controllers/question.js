const Question = require("../models/question-model");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");
const getAllQuestion = asyncWrapper(async (req, res) => {
  const question = await Question.find({});
  res.status(200).json({ question });
});

const createQuestion = asyncWrapper(async (req, res) => {
  const question = await Question.create(req.body);
  res.status(201).json({ question });
});

const getQuestion = asyncWrapper(async (req, res, next) => {
  const { id: questionID } = req.params;
  const question = await Question.findOne({ _id: questionID });
  if (!question) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ question });
});
const deleteQuestion = asyncWrapper(async (req, res, next) => {
  const { id: questionID } = req.params;
  const question = await Question.findOneAndDelete({ _id: questionID });
  if (!question) {
    return next(createCustomError(`No task with id : ${questionID}`, 404));
  }
  res.status(200).json({ question });
});
const updateQuestion = asyncWrapper(async (req, res, next) => {
  const { id: questionID } = req.params;

  const question = await Question.findOneAndUpdate(
    { _id: questionID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!question) {
    return next(createCustomError(`No task with id : ${questionID}`, 404));
  }

  res.status(200).json({ question });
});

module.exports = {
  getAllQuestion,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
