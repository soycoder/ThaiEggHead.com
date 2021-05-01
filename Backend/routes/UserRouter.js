import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/UserController.js";

let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:userID", get);
router.put("/:userID", put);
router.delete("/:userID", remove);

export default router;
