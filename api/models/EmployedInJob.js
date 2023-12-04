const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');
const Employee = require('./Employee');

class EmployedInJob extends Model { }

EmployedInJob.init({
    theEmployee: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    withCompany: {
        type: DataTypes.INTEGER,
        references: {
            model: Employer,
            key: 'id'
        }
    },
    jobTitle: {
        type: DataTypes.STRING(255) // TINYTEXT equivalent
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'EmployedInJob',
    tableName: 'employedInJob'
});

EmployedInJob.belongsTo(Employee, {
    foreignKey: 'theEmployee',
    as: 'Employee'
});

EmployedInJob.belongsTo(Employer, {
    foreignKey: 'withCompany',
    as: 'Company'
});

module.exports = EmployedInJob;
