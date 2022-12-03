"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("service", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      service_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sub_group: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_work: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      service_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      time_service: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      time_range: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      service_note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commission_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commission_percentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      commission_unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
