"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Feature extends Model {
      static associate(models) {
         // define association here
      }
   }
   Feature.init(
      {
         code: DataTypes.STRING,
         area: DataTypes.STRING,
         type: DataTypes.STRING,
         target: DataTypes.STRING,
         bonus: DataTypes.STRING,
         created: DataTypes.DATE,
         expired: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: "Feature",
      }
   );
   return Feature;
};
