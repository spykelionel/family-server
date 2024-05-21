const { register, getAllUsers } = require("../controllers/user.controller");
const { verify } = require("../middlewares/auth.middleware");

const userRouter = require("express").Router();

userRouter.post("/create", register).get("/", verify, getAllUsers);

module.exports = userRouter;
