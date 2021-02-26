const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, "Campo obrigatório"],
    unique: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: [true, "Campo obrigatório"],
  },
  challengesCompleted: {
    type: Number,
    required: [true, "Campo obrigatório"],
  },
  level: {
    type: Number,
    required: [true, "Campo obrigatório"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
