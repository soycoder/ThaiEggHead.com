import express from "express";
import {
  create,
  checkSignin,
  get,
  getByGoogleID,
  list,
  put,
  remove,
  putImg,
  getImg
} from "../controller/UserController.js";
import {jwtPassport } from '../util/jwt-passport.js';
import upload from "../helpers/filehelper.js";

let router = express.Router();
let auth = jwtPassport();

router.get("/", list);
router.post("/register", create);
router.post("/signin", checkSignin);
router.get("/google/:googleID", getByGoogleID);
router.get("/:userID", get);
router.put("/:userID", put);
router.put('/avatar/:userId', upload.any() ,auth.authenticate(), putImg);
router.get('/avatar/:userId', auth.authenticate(), getImg);
router.delete("/:userID", remove);

export default router;
