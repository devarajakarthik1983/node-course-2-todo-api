var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


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


app.get('/todos',(req,res)=>{
  Todo.find().then((docs)=>{
    res.status(200).send({docs})
  }, (err)=>{
    console.log(err);
  });
});

app.get('/todos/:id' ,(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
  return  res.status(404).send();
}

Todo.findById(id).then((todo)=>{
if(!todo) {
    return res.status(404).send();
}
    res.status(200).send({todo});


}).catch((e)=>{
  res.status(404).send();
});
});



app.listen(3000,()=>{
  console.log('Server is connected...');
});


// app.post('/users',(req,res)=>{
//   // console.log(req.body);
//   var createUser = new User({
//     email: req.body.email
//   });
//   createUser.save().then((user)=>{
//     res.status(200).send(user);
//   },(err)=>{
//     res.status(400).send(err);
//   })
// });


module.exports ={app}













































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
