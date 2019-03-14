const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express()

/** PASSPORT BASIC **/
// passport.use(require('./src/auth/basic'))
// app.get('*', passport.authenticate('basic', { session: false }))

/** PASSPORT LOCAL **/
require('./src/auth/local')(passport)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '!@#DJKALSHDJKA#@!#!@', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))
//definindo a pasta de arquivos de recursos (js,css,images)
app.use(express.static(path.join(__dirname, "public")));

require('./src/index')(app, passport)

mongoose.connect('mongodb+srv://strarWars:78Rest65@cluster0-rtnuj.mongodb.net/auth?retryWrites=true', { useNewUrlParser: true })
mongoose.Promise = global.Promise
app.listen(9000, () => {
    console.log('Express has been started')
})