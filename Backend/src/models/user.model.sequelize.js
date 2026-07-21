const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        department: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: true,
    }
);

module.exports = User;