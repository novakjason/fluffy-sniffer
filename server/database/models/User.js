const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator')

// Defining the User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // Using validator.js library to validate email address
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true,
        unique: false,
        min: [6, 'Password must be at least 6 characters'],
        max: 24,
    },
});

// Defining Schema methods for password hashing using bcrypt libary
userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
}

// Defining pre-save middleware function to use Schema methods to hash password before saving to database
userSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('🌎  ==> MISSING PASSWORD');
        next();
    } else {
        console.log('🌎  ==> PASSWORD HASHED');
        this.password = this.hashPassword(this.password);
        next();
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
