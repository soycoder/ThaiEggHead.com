import axios from 'axios';
const baseURL = "http://localhost:5000";
const axiosFetch = axios.create({
  baseURL: baseURL
});

export default axiosFetch;
