const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', (req, res, next) => {
  res.status(200).json({ users: users.getUsers() });
});

router.get('/:id', (req, res, next) => {
  const user = users.getUser(parseInt(req.params.id));
  res.status(user ? 200 : 404).json(user);
});

router.post('/', (req, res, next) => {
  const usernameExists = users.checkUsernameExists(req.body.user.username);
  if (usernameExists) {
    res.status(400).send({ message: 'Username exists' });
  } else {
    const user = users.createUser(req.body.user);
    res.status(200).json(user);
  }
})

router.put('/', (req, res, next) => {
  const usernameExists = users.checkUsernameExists(req.body.user.username);
  const user = users.updateUser(req.body.user);
  if (usernameExists) {
    res.status(400).send({ message: 'Username exists' });
  } else {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(req.body.user);
    }
  }
})

router.delete('/:id', (req, res, next) => {
  const user = users.deleteUser(parseInt(req.params.id));
  res.status(user ? 200 : 404).json(user);
});


module.exports = router