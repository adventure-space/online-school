const { Router } = require('express')
const router = Router()
const cookieParser = require('cookie-parser') 
const fs = require('fs')
const path = require('path')
router.use(cookieParser())

const sequelize = require('../modules/connect') // объект соединения с бд
const Student = require('../models/Student') // модель 
const Teacher = require('../models/Teacher')
sequelize.sync() // подключение к бд

const crypto = require('crypto');
const { json } = require('sequelize')
const myFunc = require('../functions/justFunctions')
const middlewares = require('../functions/middlewares')

function uploadAvatar(nickname, avatar) {
    let filePath;
    if (avatar) 
        filePath = path.join(__dirname, '..', 'data', 'avatars', `avatar_${nickname}.jpg`)
    else 
        filePath = path.join(__dirname, '..', 'data', 'avatars', `avatar_empty.jpg`)

    const public = path.join(__dirname, '..', 'public', 'images', 'avatar.jpg')

    let inStr = fs.createReadStream(filePath);
    let outStr = fs.createWriteStream(public);

    inStr.pipe(outStr);
}

// GET-маршут /login, который генерирует страницу из шаблона Handlebars
router.get('/', middlewares.redirectAuth, (req, res) => {
    res.render('auth');
})

// POST-маршрут /login, который принимает логин и пароль, после чего устанавливает куки и выполняет редирект
router.post('/', async (req, res) => {
    const hash = crypto.createHash('sha256');
    hash.update(req.body.password)
    const hashPassword = hash.digest('hex')

    const students = await Student.findAll({  // получение всех записей
        where: {  // у которых значения столбцов соответствуют этим
          nickname: req.body.nickname,
          pass: hashPassword
        }
    });
    const teachers = await Teacher.findAll({  // получение всех записей
        where: {  // у которых значения столбцов соответствуют этим
          nickname: req.body.nickname,
          pass: hashPassword
        }
    });

    if (students.length > 0) {
        let avatar
        if (students[0].avatar == 0) avatar = false
        else avatar = true

        const dict = {id: students[0].id, name: students[0].name, lastname: students[0].lastname, nickname: students[0].nickname, class: students[0].class, avatar: avatar};
        const jwtToken = myFunc.generateAccessToken(dict);
        res.cookie('jwt', jwtToken)
        uploadAvatar(students[0].nickname, avatar)
        res.redirect('/');
    } 
    else if (teachers.length > 0) {
        let avatar
        if (teachers[0].avatar == 0) avatar = false
        else avatar = true

        const dict = {id: teachers[0].id, name: teachers[0].name, lastname: teachers[0].lastname, nickname: teachers[0].nickname, class: -1, avatar: avatar};
        const jwtToken = myFunc.generateAccessToken(dict);
        res.cookie('jwt', jwtToken)
        uploadAvatar(teachers[0].nickname, avatar)
        res.redirect('/');
    } 
    else {
        res.render('auth', {
            error: true,
            message: 'что-то не так'
        });
    }


})

// Выход
router.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    const deletePath = path.join(__dirname, '..', 'public', 'images', 'avatar.jpg')
    fs.unlink(deletePath, (err) => {
        if (err) {console.log(err);}
    });
    res.redirect('/')
})



module.exports = router