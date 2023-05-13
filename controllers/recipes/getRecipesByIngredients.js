const { Recipe } = require("../../models/recipe");
const { Ingredient } = require("../../models/ingredient");
const { HttpError } = require("../../helpers");

const getRecipesByIngredients = async (req, res) => {
  const { query } = req.query;
  const result = await Ingredient.find({
    $text: { $search: query },
  });
  if (result.length === 0) {
    throw HttpError(404, "ingredient not found");
  }

  const ingredientsId = result.map((item) => item._id);

  const value = await Recipe.find({ "ingredients.id": { $in: ingredientsId } });
  if (value.length === 0) {
    throw HttpError(404, "recipe not found");
  }
  return res.json(value);
};

module.exports = getRecipesByIngredients;
