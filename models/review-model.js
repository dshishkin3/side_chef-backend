const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  userId: { type: String, required: true },
  recipeId: { type: Number, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: true },
  image: { type: String, required: false },
  userAvatar: { type: String, required: false },
});

module.exports = model("Review", ReviewSchema);
