// 'use strict';
import express from "express";
import upload from "../helpers/filehelper.js";
import { list, create, get } from "../controller/ForumController.js";

const router = express.Router();

router.get("/", list);
router.post("/", upload.array("files"), create);
router.get("/:forumID", get);

export default router;
