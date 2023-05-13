const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageRecipe = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "recipe",
      allowedFormats: ["jpg", "png"],
      public_id: `${uuidv4()}_${file.originalname}`,
      transformation: [{ width: 700, height: 700 }],
    };
  },
});

const uploadCloud = multer({ storage });
const uploadCloudRecipe = multer({ storage: storageRecipe });

module.exports = { uploadCloud, uploadCloudRecipe };
