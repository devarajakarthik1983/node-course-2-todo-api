const mongoose = require('mongoose');

var User = mongoose.model('User', {
  email:{
    type:String,
    minglength:1,
    required:true
  }
});

module.exports = {User}
