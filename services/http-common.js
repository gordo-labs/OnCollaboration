import axios from 'axios'
// // require('axios-debug')(axios);

export const HTTP = axios.create({
  baseURL: 'http://35.177.24.171/wp-json/',
});
