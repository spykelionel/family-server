const { login } = require("../controllers/user.controller");
const { verify, logout } = require("../middlewares/auth.middleware");

const authRouter = require("express").Router();

authRouter.get("/login", login).post("/logout", verify, logout);

module.exports = authRouter;
