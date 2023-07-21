const jwt = require('jsonwebtoken');
const token = require('../config')
module.exports = {

  authenticateToken: function authenticateToken(req, res, next) {
  const jwtToken = req.cookies['jwt']

  if (jwtToken == null) return res.sendStatus(401)

  jwt.verify(jwtToken, token, (err, user) => {

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
  },
  // Middlware для редиректа со страницы авторизации, если пользователь имеет логин в куках
 redirectAuth: (req, res, next) => {
    if(req.cookies['jwt']) {
        return res.redirect('/')
    }
    next()
  },
  // Middlware для редиректа на страницу авторизации, если пользователь не имеет логин в куках
  checkAuth: (req, res, next) => {
    if(!req.cookies['jwt']) {
        return res.redirect('/auth')
    }
    next()
  }
}