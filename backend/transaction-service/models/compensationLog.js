const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const CompensationLog = sequelize.define('CompensationLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sagaId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT }
}, { tableName: 'compensation_logs', timestamps: true })
module.exports = CompensationLog
