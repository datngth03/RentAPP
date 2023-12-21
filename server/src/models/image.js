"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Image extends Model {
      static associate(models) {
         // define association here
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
