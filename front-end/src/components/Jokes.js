import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requiresAuth from './requireAuth';

const Users = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(e => {
    axios
      .get('http://localhost:3300/api/jokes')
      .then(res => {
        console.log(res.data);
        setJokes(res.data);
      })
      .catch(error => {
        console.log('Jokes ERROR', error);
      });
  }, []);

  return (
    <>
      <h2>List of Jokes</h2>

      <ul>
        {jokes.map(joke => (
          <li key={joke.id}>{joke.joke}</li>
        ))}
      </ul>
    </>
  );
};

export default requiresAuth(Users);
