const mongoose = require("mongoose");
const slug = require("slug");
const uniqueValidator = require("mongoose-unique-validator");

const concert_shcema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  direction: { type: String, required: true },
  protagonist: { type: String, required: true },
  description: { type: String },
});

concert_shcema.plugin(uniqueValidator, { msg: "already taken" });

concert_shcema.pre("save", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
}); //pre

concert_shcema.methods.slugify = function () {
  this.slug = slug(this.name) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
}; //slugify

mongoose.model("Concert", concert_shcema);
