import { Router } from "express";
import {
  userDelete,
  userGet,
  userPost,
  userPut,
} from "../controllers/user.controller.js";

export const router = Router();

router.get("/", userGet);
router.put("/:id", userPut);
// router.put("/", userPut);
router.post("/", userPost);
router.delete("/", userDelete);
