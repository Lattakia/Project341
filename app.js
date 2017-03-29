var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});

//We're using the express framework and the mailgun-js wrapper		
var express = require('express');

var Mailgun = require('mailgun-js');


var app = express();
//Your api key, from Mailgun’s Control Panel
var api_key = 'key-e63cfbbb0bb500d1b5428053228f6360';

 
//Your domain, from the Mailgun Control Panel
var domain = 'connectconcordia.tk';

//Your sending email address
var from_who = 'encs@connectconcordia.tk';

var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var db = require('./database.js');

var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
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
//app.get('/', function(req, res){
//  res.sendfile('index.html');
//});
http.listen(3000, function () {
    console.log('listening on *:3000');
});

mongoose.connect(db.url);

require('./passport')(passport)

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
 app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(session({ secret: 'goodheavenslookatthetime' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(require('express').static('views'));

/*io.on('connection', function(socket){
socket.on('chat message', function(msg){
io.emit('chat message', msg);
  });
});*/
console.log("got an error: ");


app.use(function(req, res, next) {
    if(req.url.match('./views/chat.ejs'))
       passport.session()(req, res, next)
    else
        next();
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('its working');
        if (socket.request.user && socket.request.user.logged_in) {
            console.log(socket.request.user);
            console.log('its working finally!!');
        }
    });
});









var path = require('path');

var dbs = require('mongoskin').db("localhost/testdb", { w: 0});
    dbs.bind('event');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/init', function(req, res){
    dbs.event.insert({ 
        text:"My test event A", 
        start_date: new Date(2013,8,1),
        end_date:   new Date(2013,8,5)
    });
    dbs.event.insert({ 
        text:"My test event B", 
        start_date: new Date(2013,8,19),
        end_date:   new Date(2013,8,24)
    });
    dbs.event.insert({ 
        text:"Morning event", 
        start_date: new Date(2013,8,4,4,0),
        end_date:   new Date(2013,8,4,14,0)
    });
    dbs.event.insert({ 
        text:"One more test event", 
        start_date: new Date(2013,8,3),
        end_date:   new Date(2013,8,8),
        color: "#DD8616"
    });

    res.send("Test events were added to the database")
});


app.get('/data', function(req, res){
    dbs.event.find().toArray(function(err, data){
        //set id property for all records
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;
        
        //output response
        res.send(data);
    });
});


app.post('/data', function(req, res){
    var data = req.body;
    var mode = data["!nativeeditor_status"];
    var sid = data.id;
    var tid = sid;

    delete data.id;
    delete data.gr_id;
    delete data["!nativeeditor_status"];


    function update_response(err, result){
        if (err)
            mode = "error";
        else if (mode == "inserted")
            tid = data._id;

        res.setHeader("Content-Type","text/xml");
        res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
    }

    if (mode == "updated")
        dbs.event.updateById( sid, data, update_response);
    else if (mode == "inserted")
        dbs.event.insert(data, update_response);
    else if (mode == "deleted")
        dbs.event.removeById( sid, update_response);
    else
        res.send("Not supported operation");
});



var bodyParser = require('body-parser')