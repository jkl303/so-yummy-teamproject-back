const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const categoryList = [
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
    },
    category: {
      type: String,
      enum: categoryList,
      default: "Breakfast",
    },
    area: {
      type: String,
      default: "",
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],
      minlength: 20,
    },
    description: {
      type: String,
      default: "",
    },
    thumb: {
      type: String,
      default:
        "https://res.cloudinary.com/dik8ehacz/image/upload/v1683908759/meal_x0uynz.jpg",
    },
    preview: {
      type: String,
      default:
        "https://res.cloudinary.com/dik8ehacz/image/upload/v1683908759/meal_x0uynz.jpg",
    },
    time: {
      type: String,
      required: [true, "time is required"],
    },
    popularity: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    youtube: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },
    ingredients: {
      type: Array,
      required: [true, "ingredients is required"],
    },
    owner: {
      type: Array,
      default: [],
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleMongooseError);

const addRecipeSchema = Joi.object({
  title: Joi.string().min(3).required(),
  category: Joi.string()
    .required()
    .valid(...categoryList),
  area: Joi.string(),
  instructions: Joi.string().required().min(20),
  description: Joi.string(),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  popularity: Joi.number(),
  favorites: Joi.array(),
  likes: Joi.array(),
  youtube: Joi.string(),
  tags: Joi.array(),
  ingredients: Joi.array().required(),
});

const schemasJoi = { addRecipeSchema };

const Recipe = model("recipe", recipeSchema);

module.exports = { Recipe, schemasJoi };
