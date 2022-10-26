const express = require("express");
const router = express.Router();
const {
  getAllQuestion,
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/question");
const { protect, isOwner } = require("../middlewares/authMiddleware");

router.route("/").get(getAllQuestion).post(createQuestion, protect);
router
  .route("/:id")
  .get(getQuestion)
  .patch(updateQuestion, protect, isOwner)
  .delete(deleteQuestion, protect, isOwner);

module.exports = router;
