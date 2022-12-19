"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Pit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Pit.init(
        {
            kode_pit: DataTypes.INTEGER,
            tipe_pit: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
            is_deleted: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "pit",
            underscored: true,
            tableName: "pit",
        }
    );
    //
    return Pit;
};
