'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_users', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            kode_bengkel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nama_bengkel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                allowNull: false,
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            duration: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: true,
            },
            login_data: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: 'timestamp',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: 'timestamp',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                type: 'timestamp',
                allowNull: true,
            }
        }, {
            timestamps: true,
        })
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
