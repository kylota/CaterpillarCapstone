const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employee = require('./Employee');

class Employer extends Model { }

Employer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING(255)
    },
    headquartersAddress: {
        type: DataTypes.STRING(255)
    },
    descendantCompanies: {
        type: DataTypes.STRING(255)
    },
    predecessorCompanies: {
        type: DataTypes.STRING(255)
    },
    hasEmployed: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize,
    modelName: 'Employer',
    tableName: 'employer'
});

module.exports = Employer;
