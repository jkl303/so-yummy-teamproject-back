const { Recipe } = require("../../models/recipe");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const addOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const path = req.file && req.file.path;
  const { ingredients = [], ...recipe } = req.body;

  const newIngredients = ingredients.map((ingredient) => ({
    id: new ObjectId(ingredient.id),
    measure: ingredient.measure,
  }));

  const result = await Recipe.create({
    owner,
    thumb: path,
    preview: path,
    ...recipe,
    ingredients: newIngredients,
  });

  const recipesList = await Recipe.find({ owner });
  if (recipesList.length === 10) {
    return res
      .status(201)
      .json({ result, message: "Yuhu, you already have 10 recipes" });
  }
  res.status(201).json(result);
};
module.exports = addOwnRecipes;