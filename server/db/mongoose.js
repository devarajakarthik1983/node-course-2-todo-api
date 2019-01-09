// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
//
// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://user:user123@ds151864.mlab.com:51864/mongonodedb'
// };
// mongoose.connect(db.localhost || db.mlab);
//
// // mongoose.connect('mongodb://localhost:27017/TodoApp');
//
// module.exports ={mongoose};

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
