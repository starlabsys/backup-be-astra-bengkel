"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Pkb extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Pkb.init(
        {
            user_id: DataTypes.INTEGER,
            pit_id: DataTypes.INTEGER,
            sa_id: DataTypes.INTEGER,
            mechanic_id: DataTypes.INTEGER,
            vehicle_id: DataTypes.INTEGER,
            owner_id: DataTypes.INTEGER,
            pkb_order: DataTypes.STRING,
            pkb_date: DataTypes.DATE,
            service_date: DataTypes.DATE,
            metode_pembayaran: DataTypes.STRING,
            pekerjaan_tambahan: DataTypes.STRING,
            no_buku_claim: DataTypes.STRING,
            no_work_order: DataTypes.STRING,
            total_biaya_service: DataTypes.STRING,
            waktu_pekerjaan: DataTypes.STRING,
            status_order: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Pkb",
            underscored: true,
        }
    );

    return Pkb;
};
