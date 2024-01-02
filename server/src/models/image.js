"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Image extends Model {
      static associate(models) {
         Image.hasOne(models.Post, { foreignKey: "imagesId", as: "images" });
      }
   }
   Image.init(
      {
         image: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Image",
      }
   );
   return Image;
};
