// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', '', '!@#', {
  host: '',
  dialect: 'mysql', // chọn 'mysql'
  logging: false // bỏ log SQL nếu muốn
});

module.exports = sequelize;