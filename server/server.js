var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

const express = require('express');
const bodyParser = require('body-parser')


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  // console.log(req.body);
  var createTodo = new Todo({
    text: req.body.text
  });
  createTodo.save().then((doc)=>{
    res.status(200).send(doc);
  },(err)=>{
    res.status(400).send(err);
  })
});



app.listen(3000,()=>{
  console.log('Server is connected...');
})










































// var newTodo = new Todo({
//   text:'My first app'
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saved successfully' , doc);
// },(err)=>{
//     console.log(err);
// });
//
// var anotherTodo = new Todo({
//   test:'aish',
//   completed:false,
//   completedAt: 123
// });
//
//
// anotherTodo.save().then((doc)=>{
//   console.log('saved successfully',doc);
// },(err)=>{
//   console.log(err);
// })
