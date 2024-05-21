const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    dateOfBirth: String,
    placeOfResidence: String,
    phoneNumber: String,
    father: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    mother: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
