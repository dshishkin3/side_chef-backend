const { validationResult } = require("express-validator");

const ratingsService = require("../service/ratings-service");
const ApiError = require("../exceptions/api-error");

class RatingsController {
  async setRating(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { userId, recipeId, score } = req.body;

      const userData = await ratingsService.setRating(userId, recipeId, score);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getRating(req, res, next) {
    try {
      const recipeId = req.params.id;
      const userData = await ratingsService.getRating(recipeId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RatingsController();
