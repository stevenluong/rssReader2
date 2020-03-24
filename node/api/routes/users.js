var express = require('express');
var router = express.Router();
const oktaClient = require('../lib/oktaClient');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Create a new User (register). */
router.post('/', (req, res, next) => {
  console.log("In")
  if (!req.body) return res.sendStatus(400);
  console.log(req.body)
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
      country : req.body.country
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      console.log(user)
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      console.log(err)
      res.status(400);
      res.send(err);
    });
});

module.exports = router;
