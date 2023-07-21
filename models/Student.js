const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/connect') // Подключение объекта соединения с БД

module.exports = sequelize.define('Students', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  name: Sequelize.STRING(50),
  lastname: Sequelize.STRING(50),
  nickname: Sequelize.STRING(25),
  pass: Sequelize.STRING(64),
  class: Sequelize.INTEGER,
  avatar: Sequelize.STRING(120),
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})