const Member = require("../models/Member.model");
const logger = require("../lib/util/util");

const create = async (req, res) => {
  try {
    const member = new User(req.body);
    await member.save();
    logger.info("Saving member");
    return res.status(201).json({ message: "User saved", status: 201, member });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Could not create member", status: 500, error: error });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    logger.info(members);
    return res.status(200).json({ message: "members", status: 200, members });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Could not return members", status: 500, error: error });
  }
};

module.exports = { create, getAllMembers };
