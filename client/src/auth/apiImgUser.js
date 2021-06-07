import axios from 'axios';

const apiUrl = 'http://localhost:5000/users/avatar/';

export const imgUserUpload = async (data, imgFile) => {
    try {
        // console.log(data)
        // console.log("op "+data.imgURL)
        let user = data.userID;
        // console.log(user)
        let path = imgFile[0].name;
        console.log(path)
        
        await axios.put(apiUrl, user, path);
    } catch (error) {
        throw error;
    }
}
export const getimgUserFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getSingleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}
