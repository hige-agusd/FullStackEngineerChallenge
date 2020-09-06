const express = require('express');
const app = express();
const users = require('./users');
const usersRouter = require('./routers/users');
const reviewsRouter = require('./routers/reviews');
const empty = require('./empty');

app.use(express.json()) 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

app.post('/login', (req, res, next) => {
  const user = users.getUserByUsername(req.body.username) || {};
  let status, data;
  if (user.password === req.body.password) {
    status = 200;
    data = { message: 'Logged in succesfully', user };
  } else {
    status = 401;
    data = { message: 'Invalid credentials' };
  }
  res.status(status).send(data)
})

// listen for requests :)
const listener = app.listen(4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});