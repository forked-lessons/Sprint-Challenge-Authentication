const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../auth/authenticate');
const Users = require('../database/dbConfig');
const jwt = require('jsonwebtoken');
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const genToken = user => {
  const payload = {
    username: user.username
  };

  const secret = 'Lets keep this between us';

  const options = {
    expiresIn: '24h',
    jwtid: '10101010ls'
  };

  return jwt.sign(payload, secret, options);
};
function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  Users('users')
    .insert(creds)
    .then(ids => {
      res
        .status(201)
        .json({ id: ids[0] })
        .catch(err => {
          res
            .status(500)
            .json({ error: 'There was an error registering user.', err: err });
        });
    })
    .catch(err => res.status(500).json({ 'error registering user': err }));
}

function login(req, res) {
  const user = req.body;
  Users('users')
    .where('username', user.username)
    .then(users => {
      if (
        users.length &&
        bcrypt.compareSync(user.password, users[0].password)
      ) {
        const token = genToken(user);
        res.json({ message: "You're logged in!", token });
      } else {
        res.status(401).json({ you: "shan't pass!" });
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
