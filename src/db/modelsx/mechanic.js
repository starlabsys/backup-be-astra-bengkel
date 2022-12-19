"use strict";
const {Model} = require("sequelize");
const workshop = require("./workshop");
module.exports = (sequelize, DataTypes) => {
    class Mechanic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        // workshop_id?:BigInt,
        static associate(models) {
            // define association here
            //   Mechanic.hasMany(modelsx.workshop, {
            //     foreignKey: "workshop_id",
            //     as: "mechanics",
            //   });
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
    const mWorkshop = sequelize.define(
        "workshops",
        {name: DataTypes.STRING},
        {timestamps: false}
    );

    // mWorkshop.;

    // Mechanic.hasOne(workshop, {
    //   foreignKey: "workshop_id",
    // });
    //
    return Mechanic;
};
