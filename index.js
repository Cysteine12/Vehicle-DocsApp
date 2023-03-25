const path = require('path')
const express = require('express')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const exphbs = require('express-handlebars')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/connect')
const methodOverride = require('method-override')
const hbsHelpers = require('./config/hbs')

const app = express()


//=======Config========//
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    const morgan = require('morgan')
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
}

connectDB()


//=======Middleware======//
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ 
    limit: '10mb', 
    extended: true, 
    parameterLimit: 10000 
}))
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))
require('./config/passport-local')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method
    }
}))


//=======Views======//
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs', 
    defaultLayout: 'main',
    helpers: hbsHelpers
}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static(path.join(__dirname, './public')))


//=======Routes========//
app.use('/', require('./src/routes/auth'))

app.use('/', require('./src/routes/user'))

app.use('/vehicle', require('./src/routes/vehicle'))

app.use('/document', require('./src/routes/document'))

app.use('/admin', require('./src/routes/admin'))

app.use('/', require('./src/routes/index'))


//=======........========//
const port = process.env.PORT || 5000

app.listen(port, console.log(`Server started on port ${port}`))
