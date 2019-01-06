// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,client)=>{
  if(error){
    return console.log('Unable to connect to the Database Serve');
  }

  const db = client.db('TodoApp');

// db.collection('TodoApp').findOneAndUpdate({
//   _id: new ObjectID("5c326add71527edd72d96213")
// },{
//   $set:{
//     completed: true
//   }
// },{
//   returnOriginal: false
// }).then((res)=>{
//   console.log(res);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("5c326d1071527edd72d96214")
},{
  $set:{
    name:'aish'
  },
  $inc:{
    age:1
  }
},{
  returnOriginal:false
}).then((res)=>{
  console.log(res);
});

  //client.close();

})
