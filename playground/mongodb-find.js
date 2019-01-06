// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (error,client)=>{
  if(error){
    return console.log('Unable to connect to the Database Serve');
  }

  const db = client.db('TodoApp');

// db.collection('TodoApp').find({completedAt:true}).toArray().then((docs)=>{
// console.log(JSON.stringify(docs,undefined,2));
// }, (err)=>{
//   console.log('Umable to detch the docs');
// });

// db.collection('TodoApp').find().toArray().then((docs)=>{
// console.log(JSON.stringify(docs,undefined,2));
// }, (err)=>{
//   console.log('Umable to detch the docs');
// });

// db.collection('TodoApp').find({_id: new ObjectID('5c322ed01687dd1b40ea4d1e')}).toArray().then((docs)=>{
// console.log(JSON.stringify(docs,undefined,2));
// }, (err)=>{
//   console.log('Umable to detch the docs');
// });


// db.collection('TodoApp').find().count().then((count)=>{
// console.log('Count: ',count)
// }, (err)=>{
//   console.log('Umable to detch the docs');
// });

db.collection('Users').find({name:'Karthik'}).toArray().then((docs)=>{
console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
console.log('Unable to detch the record');
});

  //client.close();

})
