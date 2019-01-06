const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{
    type:String
  },
  completed:{
    type:Boolean
  },
  completedAt:{
    type:Number
  }
});

// var newTodo = new Todo({
//   text:'My first app'
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saved successfully' , doc);
// },(err)=>{
//     console.log(err);
// });

var anotherTodo = new Todo({
  test:'aish',
  completed:false,
  completedAt: 123
});


anotherTodo.save().then((doc)=>{
  console.log('saved successfully',doc);
},(err)=>{
  console.log(err);
})
