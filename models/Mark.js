const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/connect') // Подключение объекта соединения с БД

module.exports = sequelize.define('Marks', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  mark: Sequelize.INTEGER,
  student: Sequelize.INTEGER,
  lesson: Sequelize.INTEGER,
  task: Sequelize.INTEGER
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})