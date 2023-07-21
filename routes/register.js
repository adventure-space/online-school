const { Router } = require('express')
const router = Router()
const cookieParser = require('cookie-parser') 
router.use(cookieParser())

const sequelize = require('../modules/connect') // объект соединения с бд
const Student = require('../models/Student') // модель 
const Teacher = require('../models/Teacher') // модель 
const Class = require('../models/Class') // модель 
sequelize.sync() // подключение к бд

const crypto = require('crypto');
const myFunc = require('../functions/justFunctions')
const middlewares = require('../functions/middlewares')

async function checkData(req, res, next) {
    // проверяем все ли на месте
    if (!req.body.name || !req.body.lastname || !req.body.nickname || !req.body.password || !req.body.password_second) {
        return res.render('register', {
            error: true,
            message: 'не все заполнено'
        });
    }

    // к нормальному виду приводим
    req.body.name = myFunc.capitalize(req.body.name.trim());
    req.body.lastname = myFunc.capitalize(req.body.lastname.trim());
    req.body.nickname = req.body.nickname.trim().toLowerCase();
    req.body.password = req.body.password.trim();
    req.body.password_second = req.body.password_second.trim();

    // проверка пароля
    if (req.body.password != req.body.password_second) {
        return res.render('register', {
            error: true,
            message: 'пароли не совпадают'
        });
    }

    let onlyAlpha = [req.body.name, req.body.lastname];
    // let passwords = [req.body.nickname, req.body.password, req.body.password_second];
    for (let i=0; i < onlyAlpha.length; i++){
        // if (!/^[a-zA-Z]+$/.test(onlyAlpha[i].trim())) {
        if (!/^[\u0400-\u04FF]+$/.test(onlyAlpha[i])) {
            return res.render('register', {
                error: true,
                message: 'в имени и фамилии можно использовать только кириллицу'
            });
        }
    }
    
    if (!/^[a-z]\w+$/.test(req.body.nickname)) {
        console.log(req.body.nickname);
        return res.render('register', {
            error: true,
            message: 'неправильный ник'
        });
    }

    let classes = await Class.findByPk(Number(req.body.class));
    if (!classes) {
        return res.render('register', {
            error: true,
            message: 'такого класса нет'
        });
    }

    next();
}

// GET-маршут /login, который генерирует страницу из шаблона Handlebars
router.get('/', middlewares.redirectAuth, (req, res) => {
    res.render('register');
})
// POST-маршрут /login, который принимает логин и пароль, после чего устанавливает куки и выполняет редирект
router.post('/', middlewares.redirectAuth, checkData, async (req, res) => {
    // проверка ников
    const students = await Student.findAll({  // получение всех записей
        where: {  // у которых значения столбцов соответствуют этим
          nickname: req.body.nickname,
        }
      });
    
    const teachers = await Teacher.findAll({  // получение всех записей
    where: {  // у которых значения столбцов соответствуют этим
        nickname: req.body.nickname,
    }
    });
    if (students.length > 0 || teachers > 0) {
        res.render('register', {
            error: true,
            message: 'такой ник уже занят'
        });
    } 
    else {
        const hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        const hashPassword = hash.digest('hex');
        Student.create({
            'name': req.body.name,
            'lastname': req.body.lastname,
            'nickname': req.body.nickname,
            'pass': hashPassword,
            'class': req.body.class,
            'avatar': 0
        });
        let st = await Student.findOne({
            where: {nickname: req.body.nickname}
          })

        const dict = {name: req.body.name, lastname: req.body.lastname, nickname: req.body.nickname, class: req.body.class, avatar: false};
        const jwtToken = myFunc.generateAccessToken(dict);
        res.cookie('jwt', jwtToken)

        res.redirect('/')
    }
})

// Выход
//router.get('/logout', middleware)



module.exports = router