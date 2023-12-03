const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');  // adjust the path as needed

class UnregisteredUser extends Model {}

UnregisteredUser.init({
  submittedEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    validate: {
      isEmail: true, 
    }
  },
  pendingUserPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestedDate: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  uniqueIdentifier: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UnregisteredUser',
  tableName: 'pendingregistrationrequests',
  timestamps: true, 
  createdAt: 'requestedDate',
  updatedAt: false
});

module.exports = UnregisteredUser;