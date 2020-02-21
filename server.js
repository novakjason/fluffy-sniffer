// Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./server/database');
const passport = require('./server/passport');
const routes = require('./server/routes');

// Initializing express app
const app = express();

// Setting port number
const PORT = process.env.PORT || 3001;

// Express and MongoDB integration
const sess = {
    secret: ['bonsai, bakchoy, wiseguy, waterboy'],
    store: new MongoStore({ mongooseConnection: dbConnection }),
    cookie: {},
    resave: false,
    saveUninitialized: false,
};

app.use(session(sess));

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Passport integration
app.use(passport.initialize());
app.use(passport.session());

// API and Authentication routes
app.use(routes);

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!\n🌎  ==> View in browser: http://localhost:3000/`);
});
