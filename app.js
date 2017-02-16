var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var db = require('./database.js');

var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var passportSocketIo = require('passport.socketio');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var redisStore = require('connect-redis')(session);
var sessionStore = new redisStore({
        host: 'localhost',
        port: 6379,
        client: require('redis').createClient(),
        ttl: 300
    });

mongoose.connect(db.url);

require('./passport')(passport)

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'test',
        maxAge: 2419200000
  },
    secret: 'goodheavenslookatthetime'
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/', function(req, res){
  res.sendfile('./views/index.ejs');
});

// NEW
app.use(function(req, res, next) {
    if(req.url.match('./views/profile.ejs'))
       passport.session()(req, res, next)
    else
        next();
});

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: 'goodheavenslookatthetime',
  store: sessionStore,
  passport: passport,
  cookieParser: cookieParser
}));

io.on('connection', function(socket) {

  socket.on('chat message', function(msg) {
  	// user data from the socket.io passport middleware
    if (socket.request.user && socket.request.user.logged_in) {
      io.emit('chat message', msg);
        console.log('user is authenticated!');
    }
  });
});

//io.on('connection', function(socket){
//socket.on('chat message', function(msg){
//io.emit('chat message', msg);
//  });
//});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

