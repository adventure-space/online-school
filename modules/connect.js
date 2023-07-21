const Sequelize = require('sequelize')

module.exports = new Sequelize('eduapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});