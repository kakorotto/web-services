const User = require("../models/User");

const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(5);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const suspended = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isSuspended: true,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const unSuspended = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isSuspended: false,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  suspended,
  unSuspended,
};