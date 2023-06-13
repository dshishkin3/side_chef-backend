const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  recipeId: { type: Number, required: true },
  comments: { type: Array, default: [] },
});

module.exports = model("Comments", CommentsSchema);
