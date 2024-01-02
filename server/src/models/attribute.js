"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Attribute extends Model {
      static associate(models) {
         Attribute.hasOne(models.Post, { foreignKey: "attributesId", as: "attributes" });
      }
   }
   Attribute.init(
      {
         price: DataTypes.STRING,
         acreage: DataTypes.STRING,
         published: DataTypes.STRING,
         hashtag: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Attribute",
      }
   );
   return Attribute;
};
