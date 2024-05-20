const jwt = require("jsonwebtoken");

const logout = (req, res) => {
  try {
    // TODO: invalidate this token in future
    const token = req.headers["authorization"].split(" ")[1];
    req.headers["authorization"] = undefined;

    return res.send(201).json({ message: "User logged out successfuly" });
  } catch (error) {
    return res
      .status(401)
      .json({ ...error, status: 401, message: "Error verifying user" });
  }
};

const verify = (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ ...error, status: 401, message: "Error verifying user" });
  }
};

module.exports = { logout, verify };
