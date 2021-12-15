import axios from 'axios';

const client = axios.create({baseURL: 'http://3.38.29.135:8080'});

export default client;
