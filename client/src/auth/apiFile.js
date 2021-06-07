import axios from "axios";

const apiUrl = "http://localhost:5000/forums";

export const multipleFilesUpload = async (data, options) => {
  try {
    await axios.post(apiUrl, data, options);
    // for (var pair of data.entries()) {
    //   console.log(pair[1]);
    // }
  } catch (error) {
    throw error;
  }
};
export const getMultipleFiles = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    // console.log("Data "+JSON.stringify(data));
    // <div>{JSON.stringify(data)}</div>
    return data;
  } catch (error) {
    throw error;
  }
};

export const tagUpload = async (data, options) => {
  try {
      await axios.post(apiUrl + 'multipleFiles', data, options);
  } catch (error) {
      throw error;
  }
}
export const getTagFiles = async () => {
  try{
      const {data} = await axios.get(apiUrl + 'getMultipleFiles');
      return data;
  }catch(error){
      throw error;
  }
}