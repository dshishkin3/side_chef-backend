const CommentsModel = require("../models/comments-model");

const ApiError = require("../exceptions/api-error");

class CommentsService {
  async addComment(userId, recipeId, text) {
    const recipe = await CommentsModel.findOne({ recipeId });

    if (recipe) {
      recipe.comments.push({ userId, text });
      await recipe.save();
    } else {
      const newRecipe = new CommentsModel({
        recipeId,
        comments: [{ userId, text }],
      });
      await newRecipe.save();
      return newRecipe;
    }

    return recipe;
  }

  async deleteComment(recipeId, commentUserId) {
    const comment = await CommentsModel.findOne({ recipeId });

    if (comment) {
      comment.comments = comment.comments.filter(
        (c) => c.userId !== commentUserId
      );
      await comment.save();
    } else {
      throw ApiError.BadRequest("Comment not found");
    }

    return comment;
  }
}

module.exports = new CommentsService();
