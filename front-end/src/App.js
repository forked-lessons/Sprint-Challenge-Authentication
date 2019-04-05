import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Jokes from './components/Jokes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/register">Register</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/jokes">Jokes</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Logout</button>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/login" render={pr => <Login {...pr} />} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={Jokes} />
        </main>
      </div>
    );
  }
  logout = () => {
    localStorage.removeItem('token');
  };
}

function Home() {
  return <h1>Home Component</h1>;
}

export default App;
