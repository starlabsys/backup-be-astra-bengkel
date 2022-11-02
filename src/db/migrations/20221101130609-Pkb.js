"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Pkb", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mechanic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pkb_order: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pkb_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      service_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      metode_pembayaran: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pekerjaan_tambahan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_buku_claim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_work_order: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_biaya_service: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      waktu_pekerjaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_order: {
        type: Sequelize.STRING,
        allowNull: false,
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
