"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ReferenceError;
      // this.belongsTo(models.users, {
      //   foreignKey: "user_id",
      // });
    }
  }
  Owners.init(
    {
      user_id: DataTypes.INTEGER,
      owner_name: DataTypes.STRING,
      owner_address: DataTypes.TEXT,
      owner_identity: DataTypes.STRING,
      owner_phone: DataTypes.STRING,
      path_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Owners",
      underscored: true,
    }
  );
  return Owners;
};
