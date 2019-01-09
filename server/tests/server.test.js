const expect = require('expect');
const request = require('supertest');
const {ObjectID} =require('mongodb');



var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos =[{
  _id: new ObjectID(),
  text:'new test todo'
},
{
  _id: new ObjectID(),
  text:'new test2 todo',
  completed:true,
  completedAt:333

}]

beforeEach((done)=>{
  Todo.remove({}).then((docs)=>{
    return Todo.insertMany(todos);
  }).then(()=> done());
});

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
