const { login, register } = require("../controllers/user.controller");
const { verify, logout } = require("../middlewares/auth.middleware");

const authRouter = require("express").Router();

authRouter.post("/login", login);
authRouter.post("/create", register).post("/logout", verify, logout);

module.exports = authRouter;
