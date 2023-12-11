const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employee = require('./Employee');

class Employer extends Model { }

Employer.init({
    employerID: {
        type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    headquartersAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descendantCompanies: {
        type: DataTypes.STRING,
        allowNull: true
    },
    predecessorCompanies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hasEmployed: {
        type: DataTypes.BIGINT,
        default: null
    }
}, {
    sequelize,
    modelName: 'Employer',
    tableName: 'employer',
    timestamps: false,
});

module.exports = Employer;