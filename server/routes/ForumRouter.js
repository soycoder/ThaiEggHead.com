// 'use strict';
import express from "express";
import upload from "../helpers/filehelper.js";
import { create, get } from "../controller/ForumController.js";

const router = express.Router();

router.post('/', upload.array('files'), create);
router.get('/', get);

export default router;