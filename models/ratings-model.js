const { Schema, model } = require("mongoose");

const RatingsSchema = new Schema({
  recipeId: { type: Number, required: true },
  scores: { type: Array, default: [] },
});

module.exports = model("Ratings", RatingsSchema);
