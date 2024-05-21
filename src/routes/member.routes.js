const {
  create,
  getAllMembers,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller");
const { verify } = require("../middlewares/auth.middleware");

const memberRouter = require("express").Router();

memberRouter
  .get("/", getAllMembers)
  .post("/create", create)
  .put("/update/:id", updateMember)
  .delete("/delete/:id", deleteMember);

module.exports = memberRouter;
