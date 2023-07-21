const { Router } = require('express')
const router = Router()
const cookieParser = require('cookie-parser') 
const path = require('path')
const { Op } = require("sequelize");
const sequelize = require('../modules/connect') // объект соединения с бд
const Student = require('../models/Student') // модель 
const Teacher = require('../models/Teacher')
const Class = require('../models/Class')
const Lesson = require('../models/Lesson')
const Task = require('../models/Task')
const Mark = require('../models/Mark')
const JoinTask = require('../models/JoinTask')
sequelize.sync() // подключение к бд

const jwt = require('jsonwebtoken');
const middlewares = require('../functions/middlewares')
const myFunc = require('../functions/justFunctions')


// Станица с заданиями
router.get('/tasks/:lessonId', middlewares.checkAuth, middlewares.authenticateToken, async (req, res) => {
  if (req.user.class != -1) {
    let lesson = await Lesson.findByPk(Number(req.params.lessonId))
    let text = `${req.user.name} ${req.user.lastname}(${req.user.nickname}) зашел на страницу с заданиями ${lesson.name}`
  }

  let join = await JoinTask.findAll({
    attributes: ['task'],
    where: { lesson: Number(req.params.lessonId) }
  })
  join = JSON.stringify(join)
  join = JSON.parse(join)

  let array = [];
  join.forEach(element => {
    array.push(element['task'])
  });

  let tasks = await Task.findAll({
    where: {
      id: array
    }
  })

  const st = await Student.findOne({
    where: {
      nickname: req.user.nickname
    }
  })
  let marks = {task: -1}
  if (req.user.class != -1) {
    marks = await Mark.findAll({
      where: {
        student: st.id,
        lesson: Number(req.params.lessonId)
      }
    })
  }

  tasks = JSON.stringify(tasks)
  tasks = JSON.parse(tasks)

  tasks.forEach(element => {
    // images.push(element['task'])
    myFunc.uploadData(element['img'])
    element['img'] = `/images/${path.basename(element['img'])}`;
    if (req.user.class != -1) {
      marks.forEach(mark => {
        if (mark['task'] == element['id']) {
          element['mark'] = mark['mark'];
        }
      })
    }
  });

  let flag
  if (req.user.class == -1) {flag = true}
  else {flag = false}

  res.render('tasks', {
    posts: tasks,
    avatar: '/images/avatar.jpg',
    lesson: Number(req.params.lessonId),
    nickname: req.user.nickname,
    user: {teacher: flag},
    teacher: flag
  });
})

// Все задания
router.get('/addTask/:lessonId', middlewares.checkAuth, middlewares.authenticateToken, async (req, res) => {
  let dontNeed = await JoinTask.findAll({
    attributes: ['task'],
    where: {
      lesson: Number(req.params.lessonId)
    }
  })
  let array = [];
  dontNeed.forEach(e => {
    array.push(e['task'])
  })

  let tasks = await Task.findAll({
    where: {
      id: {
        [Op.notIn]: array
      }
    }
  })
  tasks = JSON.stringify(tasks)
  tasks = JSON.parse(tasks)

  tasks.forEach(element => {
    // images.push(element['task'])
    myFunc.uploadData(element['img'])
    element['img'] = `/images/${path.basename(element['img'])}`;
  });

  res.render('allTasks', {
    posts: tasks,
    avatar: '/images/avatar.jpg',
    lesson: Number(req.params.lessonId),
    nickname: req.user.nickname
  })
})

// Класс
router.get('/class/:classId', middlewares.checkAuth, middlewares.authenticateToken, async (req, res) => {
  let lessons = await Lesson.findAll({
    attributes: ['id', 'name'],
    where: {
      class: Number(req.params.classId)
    }
  })
  lessons = JSON.stringify(lessons)
  lessons = JSON.parse(lessons)
  res.render('class', {
    teacher: req.user.nickname,
    posts: lessons,
    lessonCount: Object.keys(lessons).length,
    name: req.user.name,
    lastname: req.user.lastname,
    avatar: "/images/avatar.jpg",
    path: 'tasks',
    class: Number(req.params.classId)
  })
})

// Страница профиля
router.get('/', middlewares.checkAuth, middlewares.authenticateToken, async (req, res) => {
  let flag
  if (req.user.class == -1) {flag = true}
  else {flag = false}

  let lessons = [];
  let myPath;
  if (req.user.class != -1) { // ученик
    let lessonsData = await Lesson.findAll({
      attributes: ['id', 'name'],
      where: {
        class: req.user.class
      }
    })
    lessons = JSON.stringify(lessonsData)
    lessons = JSON.parse(lessons)
    myPath = 'tasks'
  }
  else {
    let th = await Teacher.findAll({
      attributes: ['id'],
      where: {nickname: req.user.nickname}
    });

    lessons = await Class.findAll({
      attributes: ['id', 'name'],
      where: {
        teacher: th[0].id
      }
    })
    lessons = JSON.stringify(lessons)
    lessons = JSON.parse(lessons)

    myPath = 'class'
  }


  res.render('index', {
    posts: lessons,
    nickname: req.user.nickname, 
    name: req.user.name, 
    lastname: req.user.lastname, 
    user: {teacher: flag}, 
    avatar: "/images/avatar.jpg",
    path: myPath
  });
})


module.exports = router