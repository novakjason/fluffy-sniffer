const router = require('express').Router();
const passport = require('../../passport');

// Matches GET /auth/user
// Returns user data if found, returns null if not
router.route('/').get((req, res, next) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: 'null' });
    }
});

// Matches POST /auth/user/login
router.route('/login').post((req, res, next) => {
    console.log(`login, req.body: ${req.body}`);
    next();
}, passport.authenticate('local'), (req, res) => {
    console.log('logged in', req.user);
    let userData = {
        username: req.user.username,
    };
    res.send(userData);
});

// Matches POST /auth/user/logout
router.route('/logout').post((req, res, next) => {
    if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' });
    } else {
        res.send({ msg: 'no user to logout' });
    }
});

module.exports = router;
