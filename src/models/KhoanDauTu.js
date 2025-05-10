const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const KhoanDauTu = sequelize.define('tbl_user', {
    INVESTMENT_HOLDING_PRODUCT_ID: {
        type: DataTypes.STRING,
    },
    INTEREST_RATE: {
        type: DataTypes.STRING,
    },
    USER_ID: {
        type: DataTypes.STRING,
    },
    AMOUNT: {
        type: DataTypes.STRING,
    },
    TOTAL_PROFIT: {
        type: DataTypes.STRING,
    },
    START_DATE: {
        type: DataTypes.STRING,
    },
    END_DATE: {
        type: DataTypes.STRING,
    },
}, {
    
    tableName: 'tbl_user_investment_holding_product',
    timestamps: false
});

module.exports = KhoanDauTu;