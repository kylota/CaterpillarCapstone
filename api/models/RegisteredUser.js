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
}, {
  sequelize,
  modelName: 'RegisteredUser',
  tableName: 'registereduser',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});



module.exports = RegisteredUser;