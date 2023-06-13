const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  favorites: { type: Array, default: [] },
});

module.exports = model("User", UserSchema);
