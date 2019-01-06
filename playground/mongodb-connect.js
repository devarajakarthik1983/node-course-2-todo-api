// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,client)=>{
  if(error){
    return console.log('Unable to connect to the Database Serve');
  }

  const db = client.db('TodoApp');
  db.collection('TodoApp').insertOne({
    name:'Karthik',
    completedAt: true
  },(err,res)=>{
    if(err){
      return console.log('Unable to insert data' , err);
    }

  console.log(JSON.stringify(res.ops,undefined,2));
});


//
// db.collection('Users').insertOne({
//   name:'Karthik',
//   location:'Arbor',
//   age:25
// },(err,res)=>{
//   if(err){
//     return console.log('Unable to insert data' , err);
//   }
//
// console.log(JSON.stringify(res.ops,undefined,2));
// })



  client.close();

})
