const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../lib/util/util");

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
    logger.info(users);
    return res.status(200).json({ message: "Users", status: 200, users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Could not return users", status: 500, error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    logger.info(`Signing user with key: ${process.env.JWT_SECRET}`);
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({ name: user.name, email: user.email, password: undefined, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not login user", status: 500, error: error });
  }
};

module.exports = { register, getAllUsers, login };
