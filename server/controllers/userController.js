const db = require('../database/models');

// Defining methods for the usersController
module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => {
                // creating a copy of the object and sending it to the front without the pass hash
                var minusPass = Object.assign({}, dbModel);
                delete minusPass._doc.password;
                res.json(minusPass)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User.findOne({ username: req.body.username })
            .then(data => {
                if (data) { res.json({ error: `User "${username}" already exists!` }) }
                else { db.User.create(req.body).then(data => res.json(data)) }
            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
