const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/connect') // Подключение объекта соединения с БД

module.exports = sequelize.define('Lessons', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  class: Sequelize.INTEGER,
  name: Sequelize.STRING(150),
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})