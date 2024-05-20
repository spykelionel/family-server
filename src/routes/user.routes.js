const { register, getAllUsers } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.get("/", getAllUsers).post("/create", register);

module.exports = userRouter;
