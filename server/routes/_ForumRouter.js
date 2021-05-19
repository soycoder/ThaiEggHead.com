import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/_ForumController.js";

let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:forumID", get);
router.put("/:forumID", put);
router.delete("/:forumID", remove);

export default router;
