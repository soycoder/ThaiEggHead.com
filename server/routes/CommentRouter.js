import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/CommentController.js";

let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:commentID", get);
router.put("/:commentID", put);
router.delete("/:commentID", remove);

export default router;
