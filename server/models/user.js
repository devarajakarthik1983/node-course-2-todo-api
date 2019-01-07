const mongoose = require('mongoose');

var User = mongoose.model('User', {
  Email:{
    type:String,
    minglength:1,
    required:true
  }
});

module.exports = {User}
