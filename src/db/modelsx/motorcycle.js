"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Motorcycle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Motorcycle.init(
        {
            no_polisi: DataTypes.STRING,
            no_rangka: DataTypes.STRING,
            no_mesin: DataTypes.STRING,
            kode_tipe_unit: DataTypes.STRING,
            tahun_motor: DataTypes.INTEGER,
            informasi_bensin: DataTypes.STRING,
            km_terakhir: DataTypes.INTEGER,
            tipe_coming_customer: DataTypes.STRING,
            is_deleted: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Motorcycle",
            underscored: true,
            tableName: "Motorcycle",
        }
    );

    return Motorcycle;
};
