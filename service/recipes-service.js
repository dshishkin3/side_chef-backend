const axios = require("axios");
const reviewsService = require("./reviews-service");

class RecipesService {
  async getVegetarianRecipes() {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=24&tags=vegetarian`
    );
    return data;
  }

  async getTrendingRecipes() {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=24`
    );
    return data;
  }

  async getRecipe(id) { 
    const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const [recipeResponse, nutritionResponse] = await Promise.all([
      axios.get(recipeUrl),
      axios.get(nutritionUrl)
    ]);

    const review = await reviewsService.getReview(id);

    const recipeData = recipeResponse.data;
    const nutritionData = nutritionResponse.data;

    const fiber = nutritionData.good.find((item) => item.title === "Fiber");
    const potassium = nutritionData.good.find((item) => item.title === "Potassium");

    return {
      recipe: {
        id: recipeData.id,
        title: recipeData.title,
        image: recipeData.image,
        extendedIngredients: recipeData.extendedIngredients,
        readyInMinutes: recipeData.readyInMinutes,
        servings: recipeData.servings,
        instructions: recipeData.instructions,
        diets: recipeData.diets,
        dishTypes: recipeData.dishTypes,
      },
      nutrition: {
        calories: nutritionData.calories,
        carbs: nutritionData.carbs.replace(/\D/g, ''),
        fat: nutritionData.fat.replace(/\D/g, ''),
        protein: nutritionData.protein.replace(/\D/g, ''),
        fiber: fiber.amount.replace(/\D/g, ''),
        potassium: potassium.amount.replace(/\D/g, ''),
      },
      review
    };
  }

  async searchRecipes(name) {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${name}&number=100`
    );
    return data;
  }

  async countryRecipes(name) {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&cuisine=${name}&number=100`
    );
    return data;
  }
}

module.exports = new RecipesService();
