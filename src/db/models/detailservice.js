"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailService.init(
    {
      service_id: DataTypes.INTEGER,
      parts_id: DataTypes.INTEGER,
      qty: DataTypes.STRING,
      price: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "detailservice",
      underscored: true,
      tableName: "detailservice",
    }
  );
  //
  return DetailService;
};
