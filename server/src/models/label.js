"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Label extends Model {
      static associate(models) {
         // define association here
         Label.hasMany(models.Post, { foreignKey: "labelCode", as: "labels" });
      }
   }
   Label.init(
      {
         code: DataTypes.STRING,
         value: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Label",
      }
   );
   return Label;
};
