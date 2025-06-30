import axois from 'axios';

const API = axois.create({
      baseURL: 'http://localhost:5000/',
})

export default API;