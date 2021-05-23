import axios from "axios";

const apiUrl = "http://localhost:5000/forums";

export const multipleFilesUpload = async (data, options) => {
  try {
    await axios.post(apiUrl, data, options);
    let body;
    let tag;
    let subject;
    for (var pair of data.entries()) {
      // console.log("check "+pair[0]+', '+ pair[1]);
      console.log("check " + pair[0]);
      // console.log(pair[1]);
      if (pair[0] == "body") {
        body = pair[1];
        console.log(body);
      }
      if (pair[0] === "tag") {
        tag = pair[1];
        console.log(tag);
      }
      if (pair[0] === "subject") {
        subject = pair[1];
        console.log(subject);
      }
    }
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