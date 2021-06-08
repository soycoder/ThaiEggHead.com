import axios from "axios";

const apiUrl = "http://localhost:5000/users/avatar/";

export const avatarFileUpload = async (data, options) => {
  try {
    var object = {};
    data.forEach((value, key) => (object[key] = value));
    console.log(object.userID);

    await axios.put(apiUrl + object.userID, data, options);

  } catch (error) {
    throw error;
  }
};
