const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos =[{text:'new test todo'},{text:'new test2 todo'}]

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
});
