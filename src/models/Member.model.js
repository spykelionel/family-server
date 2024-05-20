const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  dateOfBirth: Date,
  placeOfResidence: String,
  phoneNumber: String,
  father: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  mother: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

module.exports = mongoose.model("Member", MemberSchema);
