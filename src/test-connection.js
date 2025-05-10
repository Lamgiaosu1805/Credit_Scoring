const sequelize = require('./db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối MySQL thành công!');
  } catch (error) {
    console.error('❌ Kết nối MySQL thất bại:', error);
  }
})();