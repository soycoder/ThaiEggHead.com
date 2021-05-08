// 'use strict';
import express from "express";
import upload from "../helpers/filehelper.js";
import { multipleFileUpload, getallMultipleFiles } from "../controller/fileuploaderController.js";

const router = express.Router();

router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getMultipleFiles', getallMultipleFiles);


let out = {
    routes: router
}
export default out;