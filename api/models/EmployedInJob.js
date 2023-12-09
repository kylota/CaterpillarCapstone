//const { Sequelize, DataTypes, Model } = require('sequelize');
//const sequelize = require('../config/database');

//const Employer = require('./Employer');
//const Employee = require('./Employee');

//class EmployedInJob extends Model { }

//EmployedInJob.init({
//    employeeIDs: {
//        type: DataTypes.UUID,
//        primaryKey: true,
//        allowNull: false,
//        references: {
//            model: Employee,
//            key: 'employeeID'
//        }
//    },
//    theEmployee: {
//        type: DataTypes.STRING(255),
//        references: {
//            model: Employee,
//            key: 'employeeID',
//            default: null,
//        }
//    },
//    withCompany: {
//        type: DataTypes.STRING(255)
//    },
//    employerID: {
//        type: DataTypes.UUID,
//        DEFAULT: null
//    },
//    jobTitle: {
//        type: DataTypes.STRING(255) // TINYTEXT equivalent
//    },
//    startDate: {
//        type: DataTypes.DATE
//    },
//    endDate: {
//        type: DataTypes.DATE
//    }
//}, {
//    sequelize,
//    modelName: 'EmployedInJob',
//    tableName: 'employedInJob'
//});

//EmployedInJob.belongsTo(Employee, {
//    foreignKey: 'employeeIDs',
//    as: 'employeeID'
//});

//EmployedInJob.belongsTo(Employer, {
//    foreignKey: 'employerID',
//    as: 'withCompany'
//});

//module.exports = EmployedInJob;