const express = require('express');
const router = express.Router();
const User = require('../../models/User');


// @route GET api/users
// @description Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/users/id/:id
// @description Get single user by id
router.get('/id/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

router.get('/email/:email', (req, res) => {
  User.findOne({email: req.params.email})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found with email' }));
  });
  

// @route POST api/users
// @description add/save user
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route api/user/:id
// @description Update user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE api/users/id/:id
// @description Delete user by id
// @access Public
router.delete('/id/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

// @route LOGIN
var session;
router.post('/login',(req,res) => {

  User.findOne({email: req.body.email})
  .then(user => {
    if (user != null){
      if(req.body.email == user.email && req.body.password == user.password){
          User.findByIdAndUpdate(user.id, {"session_id": req.session.id})
          .then(user => {
            session=req.session;
            session.userid=req.body.email;
            res.send(session)
          })
          
      }
      else{
          res.send({"result":'Invalid username or password'});
      }
    }
    else{
      res.send({"result":"Invalid username or password-"})
    }
  }
  )
})

// @route LOGOUT
router.get('/logout',(req,res) => {
  User.findOne({session_id: req.session.id})
  .then(user => {
    User.findByIdAndUpdate(user._id, {"session_id": ""})
    .then(user => {
      req.session.destroy();
      res.status(200).clearCookie('connect.sid', {
        path: '/'
      });
      res.send({"result":"Logged out"});
    })
    
  })
  

});

// @route get auth
router.get('/auth', (req, res) => {
  console.log(session);
  User.findOne({"session_id": session.id})
  .then(user => {
    if (user != null){
      res.json(user)
    }
    else{
      res.send({"result":"failure"})
    }
  }
  )  
  .catch(err => res.status(404).json({ nouserfound: 'No User found with session' }))

  }); 

module.exports = router;