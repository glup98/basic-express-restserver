import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - (email)",
      });
    }
    //verificar si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - (state: false)",
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - (password)",
      });
    }

    //generar el jwt
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Hable con el administrador.",
    });
  }
};
