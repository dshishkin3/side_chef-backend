const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");

const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const ratingsController = require("../controllers/ratings-controller");
const commentsController = require("../controllers/comments-controller");
const ImageCommentController = require("../controllers/image-comment-controller");
const AvatarController = require("../controllers/avatar-controller");

// GET
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/rating/:id", ratingsController.getRating);

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
  "/setRating",
  authMiddleware,
  body("userId").isString(),
  body("recipeId").isString(),
  body("score").isInt(),
  ratingsController.setRating
);
router.post(
  "/addComment",
  authMiddleware,
  body("userId").isString(),
  body("recipeId").isString(),
  body("text").isString(),
  body("image").isString().optional(),
  commentsController.addComment
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
  "/deleteComment",
  authMiddleware,
  body("recipeId").isString(),
  body("commentUserId").isString(),
  commentsController.deleteComment
);

module.exports = router;
