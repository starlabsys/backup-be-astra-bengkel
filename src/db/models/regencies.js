"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Regencies.init(
    {
      province_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "regencies",
      underscored: true,
      tableName: "regencies",
    }
  );
  //
  return Regencies;
};
