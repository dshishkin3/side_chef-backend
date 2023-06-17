const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api-error");
const ReviewsService = require("../service/reviews-service");

class ReviewsController {
  async getReview(req, res, next) {
    try {
      const recipeId = req.params.id;
      const userData = await ReviewsService.getReview(recipeId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async addReview(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { userId, recipeId, score, text, image, userAvatar } = req.body;

      const userData = await ReviewsService.addReview(
        userId,
        recipeId,
        score,
        text,
        image,
        userAvatar
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async deleteReview(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { userId, recipeId } = req.body;

      const userData = await ReviewsService.deleteReview(userId, recipeId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewsController();
