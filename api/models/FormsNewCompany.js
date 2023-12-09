const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');

class FormsNewCompany extends Model { }

FormsNewCompany.init({
    parentEmployer: {
        type: DataTypes.UUID,
        default: null,
        references: {
            model: Employer,
            key: 'employerID'
        }
    },
    childEmployer: {
        type: DataTypes.UUID,
        default: null,
        references: {
            model: Employer,
            key: 'employerID'
        }
    },
    onDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'FormsNewCompany',
    tableName: 'formsNewCompany'
});

FormsNewCompany.belongsTo(Employer, {
    foreignKey: 'parentEmployer',
    as: 'ParentEmployer'
});

FormsNewCompany.belongsTo(Employer, {
    foreignKey: 'childEmployer',
    as: 'ChildEmployer'
});

module.exports = FormsNewCompany;
