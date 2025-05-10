const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  USER_NAME: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PASSWORD: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
    
    tableName: 'tbl_user',  // chỉ định rõ tên bảng nếu khác tên model
    timestamps: false    // nếu bảng không có createdAt/updatedAt

});

module.exports = User;