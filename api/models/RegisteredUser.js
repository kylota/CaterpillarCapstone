const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class RegisteredUser extends Model {}

RegisteredUser.init({
    verifiedEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'RegisteredUser',
    tableName: 'registeredUser',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = RegisteredUser;
