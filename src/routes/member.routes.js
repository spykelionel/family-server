const {
  create,
  getAllMembers,
  updateMember,
  deleteMember,
  getStats,
} = require("../controllers/member.controller");
const { verify } = require("../middlewares/auth.middleware");

const memberRouter = require("express").Router();

memberRouter
  .get("/", verify, getAllMembers)
  .get("/stats", verify, getStats)
  .post("/create", verify, create)
  .put("/update/:id", verify, updateMember)
  .delete("/delete/:id", verify, deleteMember);

module.exports = memberRouter;
