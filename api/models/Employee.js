const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');

class Employee extends Model { }

Employee.init({
    employeeID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(255)
    },
    lastName: {
        type: DataTypes.STRING(255)
    },
    employer: {
        type: DataTypes.STRING(255)
    },
    employerID: {
        type: DataTypes.UUID,
        DEFAULT: null
    },
    ssn: {
        type: DataTypes.BIGINT,
        DEFAULT: null
    }
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee'
});

module.exports = Employee;
