import axios from "axios";
const authAxios = (token) => {
  const instance = axios.create();
  // Alter defaults after instance has been created
  instance.defaults.headers.common["Authorization"] = token;
  // instance.defaults.withCredentials = true;
  return instance;
};

export default authAxios;
