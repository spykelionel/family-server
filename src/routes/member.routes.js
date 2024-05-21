const { create, getAllMembers } = require("../controllers/member.controller");
const { verify } = require("../middlewares/auth.middleware");

const memberRouter = require("express").Router();

memberRouter.get("/", getAllMembers).post("/create", create);

module.exports = memberRouter;
