require('./config/dbModels')

const express = require('express')
const path = require('path')
const favicon = require('static-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index')
const users = require('./routes/users')

// Nossos módulos da API
const UsersAPI = require('./modules/User/routes')
const CursosAPI = require('./modules/Curso/routes')
const AlunosAPI = require('./modules/Aluno/routes')
const ProfessoressAPI = require('./modules/Professor/routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', routes)
app.use('/users', users)

// API JSON
app.use('/api/users', UsersAPI)
app.use('/api/cursos', CursosAPI)
app.use('/api/alunos', AlunosAPI)
app.use('/api/professores', ProfessoressAPI)

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})


module.exports = app
