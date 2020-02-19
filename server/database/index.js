const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fluffy-sniffer', options).then(
    () => {
        console.log('🌎  ==> DB Connected!')
    },
    err => {
        console.log('🌎  ==> Error connecting to DB!');
        console.log(err)
    }
);

module.exports = mongoose.connection;
