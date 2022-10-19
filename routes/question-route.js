const express = require("express");
const router = express.Router();
const {
  getAllQuestion,
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/question");

router.route("/").get(getAllQuestion).post(createQuestion);
router
  .route("/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
