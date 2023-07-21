const { Router } = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');


const sequelize = require('../modules/connect') // объект соединения с бд
const Student = require('../models/Student') // модель 
const Teacher = require('../models/Teacher') // модель 
const Task = require('../models/Task') // модель 
const Mark = require('../models/Mark') // модель 
const Lesson = require('../models/Lesson') // модель 
const JoinTask = require('../models/JoinTask') // модель 
sequelize.sync() // подключение к бд

const middlewares = require('../functions/middlewares')


// Добавление задачи в урок
router.post('/addTask/:lessonId/:taskId', (req, res) => {
    JoinTask.create({
        task: Number(req.params.taskId),
        lesson: Number(req.params.lessonId)
    })
    res.redirect(`/addTask/${req.params.lessonId}`)
})

// Добавление задачи
router.post('/', async (req, res) => {
    const id = await Task.count() + 1;
    let filePath;
    try {
        filePath = path.join(__dirname, '..', 'data', 'tasks', `task_${id}.jpg`)
        req.files.image.mv(filePath, (err) => { // на сервер
            if (err)
                console.log(err);
        });
    }
    catch (err) {
        return res.redirect('/')
    }

    Task.create({
        img: filePath,
        text: req.body.add_comment,
        name: req.body.name,
        answer: req.body.answer
    })

    res.redirect('/');
})

// Изменение аватара
router.post('/avatar', middlewares.authenticateToken, (req, res) => {
    let str = `avatar_${req.user.nickname}.jpg`;

    const public = path.join(__dirname, '..', 'public', 'images', 'avatar.jpg')
    const filePath = path.join(__dirname, '..', 'data', 'avatars', str)
    
    req.files.image.mv(filePath, (err) => { // на сервер
        if (err)
            console.log(err);
    })

    req.files.image.mv(public, (err) => { // в public
        if (err)
            console.log(err);})

    let flag
    if (req.user.class == -1) flag = true
    else flag = false

    if (flag) { // если учитель
        Teacher.update(
            { avatar: 1 },
            { where: { nickname: req.user.nickname } }
        )
    } else { // ученик
        Student.update(
            { avatar: 1 },
            { where: { nickname: req.user.nickname } }
        )
    }

    res.redirect('/')
})

// Проверка задачи
router.post('/check/:lessonId/:taskId', middlewares.authenticateToken, async (req, res) => {
    if (req.user.class == -1) res.redirect(`/tasks/${req.params.lessonId}`)

    let check = await Task.findByPk(req.params.taskId)
    let markFlag = 3;
    if (req.body.answer == check.answer) markFlag = 5;

    
    let st = await Student.findOne({
        where: {
            nickname: req.user.nickname
        }
    })

    let mark = await Mark.findOne({
        where: {
            task: Number(req.params.taskId),
            student: st.id,
            lesson: Number(req.params.lessonId)
        }
    })

    if (mark) {
        Mark.update(
            { mark: markFlag },
            { where: {
                task: Number(req.params.taskId),
                student: st.id,
                lesson: Number(req.params.lessonId)
            } }
        )
    }
    else {
        Mark.create({
            mark: markFlag,
            student: st.id,
            lesson: Number(req.params.lessonId),
            task: Number(req.params.taskId)
        })
    }

    res.redirect(`/tasks/${req.params.lessonId}`)
})

module.exports = router