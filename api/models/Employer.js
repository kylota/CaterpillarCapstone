const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class Employer extends Model {
    // Custom method to update hasEmployed based on SQL snippet
    static async updateHasEmployed() {
        const sql = `
        UPDATE employer
        SET hasEmployed = (
          SELECT COUNT(DISTINCT employedInJob.employeeIDs)
          FROM employedInJob
          WHERE employedInJob.withCompany = employer.companyName)`;
        await sequelize.query(sql, { type: Sequelize.QueryTypes.UPDATE });
    }
}

Employer.init({
    employerID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'employerID'
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    headquartersAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parentCompany: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null for parentCompany
    },
    hasEmployed: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hasMerged: {
        type: DataTypes.TINYINT,
        defaultValue: null, // Allow null for hasMerged
    },
    incorporationDate: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    dissolutionDate: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
}, {
    sequelize,
    modelName: 'Employer',
    tableName: 'employer',
    timestamps: false,
});

module.exports = Employer;
