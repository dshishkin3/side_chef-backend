const RecipesService = require("../service/recipes-service");

class RecipesController {
  async getVegetarianRecipes(req, res, next) {
    try {
      const data = await RecipesService.getVegetarianRecipes();
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  async getTrendingRecipes(req, res, next) {
    try {
      const data = await RecipesService.getTrendingRecipes();
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  async getRecipe(req, res, next) {
    try {
      const recipeId = req.params.id;
      const data = await RecipesService.getRecipe(recipeId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  async searchRecipes(req, res, next) {
    try {
      const name = req.params.name;
      const data = await RecipesService.searchRecipes(name);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }

  async countryRecipes(req, res, next) {
    try {
      const name = req.params.name;
      const data = await RecipesService.countryRecipes(name);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new RecipesController();
