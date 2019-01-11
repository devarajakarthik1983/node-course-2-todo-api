const expect = require('expect');
const request = require('supertest');
const {ObjectID} =require('mongodb');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed')


var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');


beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos' , ()=>{
  it('should post a todo item' ,(done)=>{
    var text = 'My test todo';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err , res)=>{
      if(err){
        return done(err);
      }
        Todo.find({text}).then((docs)=>{
          expect(docs.length).toBe(1);
          expect(docs[0].text).toBe(text);
          done();
        }).catch((e)=>{
          done(e);
    });
  });
});

it('should return bad request on passing empty text' ,()=>{
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err ,res)=>{
    if(err){
      return done(err);
    }

    Todo.find().then((docs)=>{
      expect(docs.length).toBe(2);
      done();
    }).catch((e)=>{
      done(e);
  });
});
});

it('should get all the todos' ,(done)=>{
  request(app)
  .get('/todos')
  .send()
  .expect(200)
  .expect((res)=>{
    expect(res.body.docs.length).toBe(2);
  })
  .end((err ,res)=>{
    if(err){
      return done(err);
    }
    Todo.find().then((docs)=>{
      expect(docs.length).toBe(2);
      done();
    }).catch((e)=>{
      done(e);
    });
});
});

it('should get the correct todo' ,(done)=>{
  request(app)
  .get(`/todos/${todos[0]._id.toHexString()}`)
  .send()
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo.text).toBe(todos[0].text);
  })
  .end(done);
});

it('should give empty object when no id has been found' ,(done)=>{
var id ='6c34cd2d5847ba8ae9dbcaee';
request(app)
.get('/todos/id')
.expect(404)
.end(done);
});


it('should give empty object when no id has been found' ,(done)=>{

request(app)
.get('/todos/123')
.expect(404)
.end(done);
});
});


describe('DELETE Todos',()=>{
it('should delete the todo' , (done)=>{
  var hexId=todos[1]._id.toHexString();
  request(app)
  .delete(`/todos/${hexId}`)
  .expect(200)
  .expect((res)=>{
    expect(res.body.todo._id).toBe(hexId);
  })
  .end((err,res)=>{
    if(err){
      return done(err);
    }

    Todo.findById(hexId).then((todo)=>{
      expect(todo._id.toHexString()).toBe(hexId);
      done();
    }).catch((e)=>{
      done(e);
    });
  });

});
});

it('should return 404 if the id not found' , (done)=>{
var id ='6c34cd2d5847ba8ae9dbcaee';
request(app)
.delete('/todos/id')
.expect(404)
.end(done);
});

it('should return 404 if the objectid is invalid' , (done)=>{
request(app)
.delete('/todos/123')
.expect(404)
.end(done);
});



describe('Update Todos' ,()=>{
  it('should update the todo' , (done)=>{
    var hexId=todos[0]._id.toHexString();
    var text = 'updated text';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text,completed:true})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(true)
      expect(res.body.todo.completedAt).not.toBeNull();

    })
    .end(done);
  });

  it('Update Todos set completed to false and check if completedAt is null' , (done)=>{
    var hexId=todos[1]._id.toHexString();
    var text = 'updated text';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text,completed:false})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text)
      expect(res.body.todo.completed).toBe(false)
      expect(res.body.todo.completedAt).toBeNull();

    })
    .end(done);
  });


});



describe('GET .users/me' ,()=>{

  it('should return the user when proper token is passed' , (done)=>{
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe(users[0].email);
      expect(res.body._id).toBe(users[0]._id.toHexString());
    })
    .end(done);
  });

it('should return 404 bad request when no token or invalid token is passed',(done)=>{
  request(app)
  .get('/users/me')
  .expect(401)
  .expect((res)=>{
    expect(res.body).toEqual({});
  })
  .end(done);
})

});

describe('POSTS /users' , ()=>{

it('should create user when req is valid' ,(done)=>{
  var email ='testuser1@email.com';
  var password ='pass123';
  request(app)
  .post('/users')
  .send({email,password})
  .expect(200)
  .expect((res)=>{
    expect(res.headers['x-auth']).toExist();
    expect(res.body.email).toBe(email);
    expect(res.body._id).toExist();
  })
  .end((err)=>{
    if(err){
      return done(err);
    }

    User.findOne({email}).then((user)=>{
      expect(user).toExist();
      expect(user.password).toNotBe(password);
      done();
    }).catch((e)=>{
      done(e);
    })
  })

});//end of test case 1

it('should return validation error if the request is invalid',(done)=>{
request(app)
.post('/users')
.send({
  email:'test',
  password:'123'
})
.expect(400)
.end(done);

});//end of test case 2

it('should not create user whose email in use',(done)=>{
  request(app)
  .post('/users')
  .send({
    email:'andrew@example.com',
    password:'123'
  })
  .expect(400)
  .end(done);

});// end of test case3

});//end  of descrive block


describe('POST /users/login' , ()=>{

  it('should send the token when valid email and password is sent' ,(done)=>{
    request(app)
    .post('/users/login')
    .send({email:users[1].email, password:users[1].password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toExist();
      expect(res.body.email).toBe(users[1].email);
    })
    .end((err,res)=>{
      if(err){
        return done();
      }

      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens[0]).toInclude({
          access:'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch((e)=>{
        done(e);
      })
    });

  });//end of test case 1

  it('should send 400 bad request when Invalid email and password is sent' ,(done)=>{
    request(app)
    .post('/users/login')
    .send({email:users[1].email, password:'23wer'})
    .expect(400)
    .expect((res)=>{
      expect(res.headers['x-auth']).toNotExist();

    })
    .end((err,res)=>{
      if(err){
        return done();
      }

      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e);
      })
    });

  });//end of test case 2
});//end of describe block


describe('token should vbe deleted and user logs out',()=>{
  it('should delete the token' ,(done)=>{
    request(app)
    .delete('/users/me/token')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      User.findById(users[0]._id).then((user)=>{
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e)=>{
        done(e);
      })
    })
  })

});//end of describe block

  // describe('Update Todos set completed to false and check if completedAt is null' ,()=>{
  //   it('should update the todo' , (done)=>{
  //     var hexId=todos[1]._id.toHexString();
  //     var text = 'updated text';
  //     request(app)
  //     .patch(`/todos/${hexId}`)
  //     .send({text,completed:true})
  //     .expect(200)
  //     .expect((res)=>{
  //       expect(res.body.todo.text).toBe(text)
  //       expect(res.body.todo.completed).toBe(false)
  //       expect(res.body.todo.completedAt).toBeNull();
  //
  //     })
  //     .end(done);
  //   });
