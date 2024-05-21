const Member = require("../models/Member.model");
const logger = require("../lib/util/util");

const create = async (req, res) => {
  try {
    const user = req.user.user._id;
    logger.info(`User: ${JSON.stringify(req.user)}`);
    const member = new Member({ ...req.body, user });
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
    const user = req.user._id;
    const members = await Member.find({ user }).populate("mother father");
    logger.info(members);
    return res.status(200).json({ message: "members", status: 200, members });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Could not return members", status: 500, error: error });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // this can contain any subset of the member fields

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found", status: 404 });
    }

    logger.info("Updating member");
    return res
      .status(200)
      .json({ message: "Member updated", status: 200, member: updatedMember });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Could not update member", status: 500, error: error });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found", status: 404 });
    }
    logger.info("Deleting member");
    return res.status(200).json({ message: "Member deleted", status: 200 });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ message: "Could not delete member", status: 500, error: error });
  }
};

module.exports = { create, getAllMembers, updateMember, deleteMember };
