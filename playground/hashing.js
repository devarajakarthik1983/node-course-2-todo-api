const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'password123';

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err , hash)=>{
//     console.log(hash);
//   })
// });

var haspassword = '$2a$10$3oLnXtH0hfbsEASbTXIjjOkqrpaN80.HmfgFFK.cnw4yOxunfmNCW';

bcrypt.compare(password,haspassword,(err,res)=>{
  console.log(res);
});

// var message = 'I am user1';
// var hash = SHA256(message);
//
// console.log(hash.toString());
//
// //crypto exmaple
//
// var data ={
//   id:4
// }
//
// var token ={
//   data,
//   hash: SHA256(JSON.stringify(data) + 'new').toString()
// }
//
// token.data.id =5;
// token.hash = SHA256(JSON.stringify(data)).toString()
//
// var resulthash = SHA256(JSON.stringify(token.data) + 'new').toString();
//
// if(token.hash === resulthash){
//   console.log('Data matches');
// } else{
//   console.log('Data doesnt match');
// }

// var data ={
//   id:11
// }
//
// var token = jwt.sign(data , '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token , '123abc')
// console.log(decoded);
