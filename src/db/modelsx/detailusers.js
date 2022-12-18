"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DetailUsers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    DetailUsers.init(
        {
            user_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            name_dealer: DataTypes.STRING,
            dealer_number: DataTypes.STRING,
            is_deleted: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "DetailUsers",
        }
    );
    //
    return DetailUsers;
};
