// 'use strict';
import express from "express";
import upload from "../helpers/filehelper.js";
import {
  list,
  create,
  get,
  listTag,
  createTag,
  listEachUser,
  put,
} from "../controller/ForumController.js";

const router = express.Router();

router.get("/", list);
router.get("/user/:userID", listEachUser);
router.get("/tag", listTag);
router.post("/", upload.array("files"), create);
router.post("/tag", createTag);
router.get("/:forumID", get);
router.put("/:forumID", put);


export default router;
