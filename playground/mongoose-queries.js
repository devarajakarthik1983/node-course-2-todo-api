const {ObjectID} =require('mongodb')

const mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var {User} =require('./../server/models/user');

var id ='5c34b4cd4fb781c42ddfa079';
//
// if(!(ObjectID.isValid(id))){
//   console.log('Id is not valid');
// }
//
// // Todo.find({
// //   _id:id
// // }).then((docs)=>{
// //   console.log('Docs',docs);
// // });
// //
// // Todo.findOne({
// //   _id:id
// // }).then((doc)=>{
// //   console.log('Docs',doc);
// // });
//
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//   return  console.log('Unbale to fetch an Todo');
//   }
//   console.log('Docs',todo);
// }).catch((e)=>{
//   console.log(e);
// })
//
User.find(id).then((user)=>{
  if(!user){
    console.log('Unable to return the record');
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
});
