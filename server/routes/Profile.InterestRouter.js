import express from "express";
import {
  create,
  get,
  list,
  put,
  remove,
} from "../controller/Profile.InterestController.js";

let router = express.Router();
router.get("/", list);
router.post("/", create);
router.get("/:interestID", get);
router.put("/:interestID", put);
router.delete("/:interestID", remove);

export default router;
