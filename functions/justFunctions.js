const jwt = require('jsonwebtoken');
const token = require('../config')

const path = require('path');
const fs = require('fs');

const sequelize = require('../modules/connect') // объект соединения с бд
const Student = require('../models/Student') // модель 
const Teacher = require('../models/Teacher') // модель 
sequelize.sync() // подключение к бд

module.exports = {

    capitalize: (x) => {
        let ans = x[0].toUpperCase() + x.slice(1).toLowerCase();
        return ans;
    },
    generateAccessToken: (username) => {
        return jwt.sign(username, token);
    },
    uploadData: (data) => {
        const public = path.join(__dirname, '..', 'public', 'images', path.basename(data))

        let inStr = fs.createReadStream(data);
        let outStr = fs.createWriteStream(public);

        inStr.pipe(outStr);
        return public;
    }
}