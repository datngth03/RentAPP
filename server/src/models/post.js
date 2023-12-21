"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Post extends Model {
      static associate(models) {
         // define association here
      }
   }
   Post.init(
      {
         title: DataTypes.STRING,
         star: DataTypes.STRING,
         labelCode: DataTypes.STRING,
         address: DataTypes.STRING,
         attributesId: DataTypes.STRING,
         categoryCode: DataTypes.STRING,
         description: DataTypes.TEXT,
         userId: DataTypes.STRING,
         featureId: DataTypes.STRING,
         imagesId: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Post",
      }
   );
   return Post;
};
