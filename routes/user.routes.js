import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateJWT, hasRole } from "../middlewares/index.js";

import {
  existsUserId,
  isEmailDuplicated,
  isValidRole,
} from "../helpers/db-validators.js";
import {
  userDelete,
  userGet,
  userPost,
  userPut,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userGet);
userRouter.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserId),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPut
);
// router.put("/", userPut);
userRouter.post(
  "/",
  [
    check("name", "El nombre es obligatoria").notEmpty(),
    check("password", "La contraseña debe ser de mas de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(isEmailDuplicated),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("role").custom((role) => isValidRole(role)),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPost
);
userRouter.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserId),
    validateFields,
  ],
  userDelete
);
