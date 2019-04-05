import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requiresAuth from './requireAuth';
import './jokes.scss';
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
    <section>
      <h2>List of Jokes</h2>

      <ul className="jokes">
        {jokes.map(joke => (
          <li key={joke.id} className="joke">
            {joke.joke}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default requiresAuth(Users);
