const RatingsModel = require("../models/ratings-model");

class RatingsService {
  async setRating(userId, recipeId, score) {
    const recipe = await RatingsModel.findOne({ recipeId });

    if (recipe) {
      const indexExistRating = recipe.scores.findIndex(
        (rating) => rating.userId === userId
      );

      if (indexExistRating < 0) {
        recipe.scores.push({ userId, score });
        await recipe.save();
      } else {
        recipe.scores[indexExistRating].score = score;
        recipe.markModified("scores");
        await recipe.save();
      }
    } else {
      const newRecipe = new RatingsModel({
        recipeId,
        scores: [{ userId, score }],
      });
      await newRecipe.save();
      return newRecipe;
    }

    return recipe;
  }

  async getRating(recipeId) {
    const recipe = await RatingsModel.findOne({ recipeId });
    const averageRating =
      recipe.scores.reduce((acc, curr) => acc + curr.score, 0) /
      recipe.scores.length;

    return averageRating;
  }
}

module.exports = new RatingsService();
