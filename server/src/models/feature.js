"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Feature extends Model {
      static associate(models) {
         Feature.hasOne(models.Post, { foreignKey: "featureId", as: "features" });
      }
   }
   Feature.init(
      {
         code: DataTypes.STRING,
         area: DataTypes.STRING,
         type: DataTypes.STRING,
         target: DataTypes.STRING,
         bonus: DataTypes.STRING,
         created: DataTypes.STRING,
         expired: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Feature",
      }
   );
   return Feature;
};
