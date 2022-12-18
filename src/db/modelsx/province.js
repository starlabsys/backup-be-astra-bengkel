"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `modelsx/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Users.init(
        {
            name: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "province",
            underscored: true,
            tableName: "province",
        }
    );
    //
    return Users;
};
