const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Course = require('./Course');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
});

// Definición de relaciones Muchos a Muchos
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId' });

module.exports = Enrollment;
