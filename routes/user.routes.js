import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
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

export const router = Router();

router.get("/", userGet);
router.put(
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
router.post(
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
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserId),
    validateFields,
  ],
  userDelete
);
