const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "User saved", status: 201, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not create user", status: 500, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    return res.status(200).json({ message: "Users", status: 200, users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Could not return users", status: 500, error: error });
  }
};

module.exports = { register, getAllUsers };
