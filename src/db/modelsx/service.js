"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Service.init(
        {
            service_code: DataTypes.STRING,
            service_name: DataTypes.STRING,
            group: DataTypes.STRING,
            sub_group: DataTypes.STRING,
            category_work: DataTypes.STRING,
            service_price: DataTypes.INTEGER,
            time_service: DataTypes.INTEGER,
            time_range: DataTypes.INTEGER,
            service_note: DataTypes.STRING,
            commission_type: DataTypes.STRING,
            commission_percentage: DataTypes.INTEGER,
            commission_unit: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "service",
            underscored: true,
            tableName: "service",
        }
    );
    //
    return Service;
};
