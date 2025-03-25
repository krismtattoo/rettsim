const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Incident = sequelize.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('active', 'in_progress', 'resolved', 'cancelled'),
    defaultValue: 'active'
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: true
  }
});

module.exports = Incident; 