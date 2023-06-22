const ReviewModel = require("../models/review-model");

const ApiError = require("../exceptions/api-error");

class ReviewsService {
  async getReview(recipeId) {
    const reviews = await ReviewModel.find({ recipeId });
    const averageRating =
      reviews.reduce((acc, curr) => acc + curr.score, 0) / reviews.length;

    return averageRating;
  }
  async addReview(userId, recipeId, score, text, image, userAvatar) {
    const existReview = await ReviewModel.findOne({ userId });

    if (existReview) {
      throw ApiError.BadRequest("You have already reviewed this recipe");
    }

    const review = new ReviewModel({
      userId,
      recipeId,
      score,
      text,
      image,
      userAvatar,
    });
    await review.save();
    return review;
  }

  async deleteReview(userId, recipeId) {
    const review = await ReviewModel.findOne({ recipeId });

    if (review.userId === userId) {
      review.deleteOne();
    } else {
      throw ApiError.BadRequest(
        "Review not foundThis comment belongs to another user"
      );
    }

    if (!review) {
      throw ApiError.BadRequest("Review not found");
    }

    return review;
  }
}

module.exports = new ReviewsService();
