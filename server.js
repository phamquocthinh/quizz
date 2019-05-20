const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const logger = require('morgan')
const mongoDb = require('./server/libs/mongodb')
mongoDb.connect()

const account = require('./server/routes/account')
const user = require('./server/routes/user')
const question = require('./server/routes/question')

let app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
    if(req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'))

app.get('/', function (req, res) {
   res.send("Hello World!"); 
});

app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'sessionSecret',
  resave: true,
  saveUninitialized: true
}))

app.use('/account', account)

app.use((req, res, next) => {
	// do logging
    const sess = req.session
	if (!sess.USER && req.method !== 'POST') {
		return res.redirect('/account/login')
	}
	next() // make sure we go to the next routes and don't stop here
})

app.use('/user', user)
app.use('/question', question)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  return res.render('error', { message: 'error' })
})

app.listen(PORT, function(){
    console.log(`Listen on port ${PORT}...`);
});