"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workshop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Workshop.init(
    {
      user_id: DataTypes.STRING,
      dealer_number: DataTypes.STRING,
      dealer_name: DataTypes.STRING,
      address: DataTypes.STRING,
      data_1: DataTypes.STRING,
      data_2: DataTypes.STRING,
      data_3: DataTypes.STRING,
      is_deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "workshops",
      underscored: true,
      tableName: "workshops",
    }
  );
  //
  return Workshop;
};
