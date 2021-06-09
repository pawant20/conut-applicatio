require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    "useNewUrlParser": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true,
    // "user" : process.env.MONGODB_USER,
    // "pass" : process.env.MONGODB_PASSWORD
}

mongoose.connect(process.env.DATABASE_URL,options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database')
});




    



