import { Router } from "express";
// import { check } from "express-validator";
import { login } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").notEmpty(),
    validateFields,
  ],
  login
);
