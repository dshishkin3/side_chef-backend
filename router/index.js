const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const ImageCommentController = require("../controllers/image-comment-controller");
const AvatarController = require("../controllers/avatar-controller");
const ReviewsController = require("../controllers/reviews-controller");
const RecipesController = require("../controllers/recipes-controller");

// GET
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/review/:id", ReviewsController.getReview);
router.get("/vegetarian", RecipesController.getVegetarianRecipes);
router.get("/trending", RecipesController.getTrendingRecipes);
router.get("/recipe/:id", RecipesController.getRecipe);

// POST
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("username").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.login
);
router.post("/logout", userController.logout);
router.post(
  "/addToFavorites",
  authMiddleware,
  body("id").isString(),
  body("recipe").isObject(),
  userController.addToFavorites
);
router.post(
  "/addReview",
  authMiddleware,
  body("userId").isString(),
  body("recipeId").isString(),
  body("score").isInt(),
  body("text").isString(),
  body("image").isString().optional(),
  body("userAvatar").isString().optional(),
  ReviewsController.addReview
);
router.post(
  "/uploadCommentImage",
  authMiddleware,
  ImageCommentController.uploadImage
);
router.post("/uploadAvatar", authMiddleware, AvatarController.uploadAvatar);

// PUT
router.put(
  "/update",
  authMiddleware,
  body("id").isString(),
  body("avatar").isString().optional(),
  body("username").isString().optional(),
  body("email").isString().optional(),
  body("password").isString().optional(),
  userController.update
);

// DELETE
router.delete(
  "/deleteFromFavorites",
  authMiddleware,
  userController.deleteFromFavorites
);
router.delete(
  "/deleteReview",
  authMiddleware,
  body("userId").isString(),
  body("recipeId").isString(),
  ReviewsController.deleteReview
);

module.exports = router;
