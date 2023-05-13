const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const addFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const isAlreadyAdded = await Recipe.findOne({
    $and: [{ _id: id }, { favorites: owner }],
  });

  if (isAlreadyAdded) {
    throw HttpError(404, "Already added to favorites");
  }

  const result = await Recipe.findByIdAndUpdate(
    { _id: id },
    {
      $push: { favorites: owner },
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};
// добавить рецепт в "избранное"

module.exports = addFavorite;
