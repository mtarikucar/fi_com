const express = require('express')
const app = express()
const hostname = '127.0.0.1'
const exphbs = require('express-handlebars')
const { resolve, format } = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const fileupload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const moment = require('moment')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const user = require('./models/user')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 5000 


// database
mongoose.connect('mongodb://127.0.0.1/node_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//session set
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))



app.use(fileupload())


app.use(express.static('public'))
app.use(methodOverride('_method'))

app.engine("handlebars", exphbs({ helpers: { generateDate: generateDate } }));
app.set('view engine', 'handlebars')



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


//DISPLAY link MiddleWare
app.use((req, res, next) => {
  const { userId } = req.session
  const { email, _id } = req.body
  if (userId) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})


//flash - message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')

app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)

app.listen(PORT, hostname, () => {
  console.log(`'server is working, http://${hostname}:5000/'`)
})


