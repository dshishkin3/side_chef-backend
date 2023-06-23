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

  async getRecipe(id) {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    return data;
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
