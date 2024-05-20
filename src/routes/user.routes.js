const { register, getAllUsers } = require("../controllers/user.controller");
const { verify } = require("../middlewares/auth.middleware");

const userRouter = require("express").Router();

userRouter.get("/", verify, getAllUsers).post("/create", register);

module.exports = userRouter;
