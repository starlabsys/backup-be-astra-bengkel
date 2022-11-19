"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mechanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Mechanic.init(
    {
      workshop_id: DataTypes.INTEGER,
      mechanic_name: DataTypes.STRING,
      mechanic_number: DataTypes.STRING,
      mechanic_gender: DataTypes.STRING,
      mechanic_phone: DataTypes.INTEGER,
      mechanic_address: DataTypes.STRING,
      is_deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "mechanic",
      underscored: true,
      tableName: "mechanics",
    }
  );
  //
  return Mechanic;
};
