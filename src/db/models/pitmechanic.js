"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PitMechanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PitMechanic.init(
    {
      pit_id: DataTypes.INTEGER,
      mechanic_id: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      is_deleted: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "pitmechanic",
      underscored: true,
      tableName: "pitmechanic",
    }
  );
  //
  return PitMechanic;
};
