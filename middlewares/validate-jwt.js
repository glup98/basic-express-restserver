import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const validateJWT = async (req, res, next) => {
  const token = req.header("x-token" || "token" || "Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    //}

    // Verificar si el uid tiene estado en true
    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - (user no existe en DB)",
      });
    }
    // Verificar si el uid tiene estado en true
    if (!user.state) {
      return res.status(401).json({
        msg: "Token no válido - (user state: false)",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};
