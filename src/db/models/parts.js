"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parts.init(
    {
      parts_name: DataTypes.STRING,
      parts_qty: DataTypes.STRING,
      parts_price: DataTypes.STRING,
      is_deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Parts",
      underscored: true,
    }
  );
  //
  return Parts;
};
