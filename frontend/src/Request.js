import axios from 'axios'

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20000,
  withCredentials: true,
});

export default request;