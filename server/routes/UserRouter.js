import express from "express";
import {
  create,
  checkSignin,
  get,
  getByGoogleID,
  list,
  put,
  remove,
} from "../controller/UserController.js";

let router = express.Router();
router.get("/", list);
router.post("/register", create);
router.post("/signin", checkSignin);
router.get("/google/:googleID", getByGoogleID);
router.get("/:userID", get);
router.put("/:userID", put);
router.delete("/:userID", remove);

export default router;
