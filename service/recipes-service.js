const axios = require("axios");

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
}

module.exports = new RecipesService();
