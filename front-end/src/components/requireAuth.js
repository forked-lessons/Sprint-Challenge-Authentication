import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
  config.headers.authorization = localStorage.getItem('token');
  return config;
});

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('token');
      const notLoggedIn = <h3>Please log in</h3>;
      return <> {token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
