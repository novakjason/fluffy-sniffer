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
    console.log(`🌎  ==> Authenticating ${req.body.email}`);
    next();
}, passport.authenticate('local'), (req, res) => {
    console.log(`🌎  ==> Login Successful`);
    console.log(`🌎  ==> Welcome ${req.user.firstName} ${req.user.lastName}`);
    let userData = {
        email: req.user.email,
    };
    res.send(userData);
});

// Matches POST /auth/user/logout
router.route('/logout').post((req, res, next) => {
    if (req.user) {
        req.logout();
        res.send({ msg: '🌎  ==> Logging out!' });
    } else {
        res.send({ msg: '🌎  ==> No user to logout!' });
    }
});

module.exports = router;
