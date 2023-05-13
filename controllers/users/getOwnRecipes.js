const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Recipe.find({ owner });
  if (!result) {
    throw HttpError(404, "User has no recipes yet!");
  }
  res.json(result);
};

module.exports = getOwnRecipes;
