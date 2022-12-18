"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Motorcycle", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      no_polisi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_rangka: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_mesin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kode_tipe_unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tahun_motor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      informasi_bensin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      km_terakhir: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipe_coming_customer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // createdAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Motorcycle");
  },
};
