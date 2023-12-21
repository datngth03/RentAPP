"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Contact extends Model {
      static associate(models) {
         // define association here
      }
   }
   Contact.init(
      {
         realName: DataTypes.STRING,
         address: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Contact",
      }
   );
   return Contact;
};
