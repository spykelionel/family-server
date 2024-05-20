const jwt = require("jsonwebtoken");
const logger = require("../lib/util/util");

const logout = (req, res) => {
  try {
    // TODO: invalidate this token in future
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ ...error, status: 401, message: "Error verifying user" });
    } else {
      req.headers["authorization"] = undefined;
      logger.info("Found authorization header. Terminating user....");
    }

    return res.send(201).json({ message: "User logged out successfuly" });
  } catch (error) {
    return res
      .status(401)
      .json({ ...error, status: 401, message: "Error verifying user" });
  }
};

const verify = (req, res, next) => {
  logger.info(`Verifying user with key: ${process.env.JWT_SECRET}`);
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("No authorization header");
    } else {
      logger.info("Found authorization header. Verifying user....");
    }
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    logger.error(JSON.stringify(error));
    return res
      .status(401)
      .json({ ...error, status: 401, message: "Error verifying user" });
  }
};

module.exports = { logout, verify };
