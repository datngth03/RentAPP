"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Post extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Post.init(
      {
         title: DataTypes.STRING,
         star: DataTypes.STRING,
         labelCode: DataTypes.STRING,
         adderss: DataTypes.STRING,
         attributesId: DataTypes.STRING,
         categoryCode: DataTypes.STRING,
         desciption: DataTypes.TEXT,
         userId: DataTypes.STRING,
         featureId: DataTypes.STRING,
         imagesID: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Post",
      }
   );
   return Post;
};
