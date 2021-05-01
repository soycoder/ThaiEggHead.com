import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/AnswerController.js";

let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:answerID", get);
router.put("/:answerID", put);
router.delete("/:answerID", remove);

export default router;
