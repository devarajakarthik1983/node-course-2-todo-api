const {ObjectID} =require('mongodb')

const mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var {User} =require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//   console.log(res);
// });

//
// Todo.findOneAndRemove({}).then((res)=>{
//   console.log(res);
// });


Todo.findByIdAndRemove('5c351944f6eeabd9c840f323').then((res)=>{
  console.log(res);
});
