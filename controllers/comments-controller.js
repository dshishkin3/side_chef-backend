const { validationResult } = require("express-validator");

const commentsService = require("../service/comments-service");
const ApiError = require("../exceptions/api-error");

class CommentsController {
  async addComment(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { userId, recipeId, image, text } = req.body;

      const userData = await commentsService.addComment(userId, recipeId, image, text);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { recipeId, commentUserId } = req.body;

      const userData = await commentsService.deleteComment(
        recipeId,
        commentUserId
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CommentsController();
