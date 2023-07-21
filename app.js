const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

// Handlebars
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
// Статичная папка
app.use(express.static('./public'))

// Cookie
const cookieParser = require('cookie-parser') 
app.use(cookieParser())

// Преобразование данных из буфера в читаемый вид
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Загрузка файлов на сервер
app.use(fileUpload())

// Роуты
app.use('/upload', require('./routes/upload'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/pages'))

app.listen(3000);