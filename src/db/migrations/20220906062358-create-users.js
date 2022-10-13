"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUnique: (value, next) => {
            UserModel.findAll({
              where: { email: value },
              attributes: ["id"],
            })
              .then((user) => {
                if (user.length != 0)
                  next(new Error("Email address already in use!"));
                next();
              })
              .catch((onError) => console.log(onError));
          },
        },
      },
      password: {
        type: Sequelize.STRING,
      },
      roles: {
        type: Sequelize.ENUM("Admin", "Owner", "Cashier"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
