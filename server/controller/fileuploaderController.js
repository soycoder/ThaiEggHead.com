// 'use strict';
import MultipleFile from "../models/mulitipleFileSchema.js";

export const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            body: req.body.body,
            tag: req.body.tag,
            subject: req.body.subject,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const getallMultipleFiles = async (req, res, next) => {
    let filter = req.query;
    try{
        const files = await MultipleFile.find(filter);
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}

let out = {
    multipleFileUpload,
    getallMultipleFiles
}
export default out;