const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/connect') // Подключение объекта соединения с БД

module.exports = sequelize.define('Tasks', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  img: Sequelize.STRING(120),
  text: Sequelize.STRING(1000),
  name: Sequelize.STRING(100),
  answer: Sequelize.STRING(200)
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})