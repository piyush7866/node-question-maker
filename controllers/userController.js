const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({
      status: "success",
      message: "User successfully Deleted",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
