import Role from "../models/role.js";
import User from "../models/user.js";

export const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no esta registrado en la BD`);
  }
};

export const isEmailDuplicated = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} ya esta registrado`);
  }
};

export const existsUserId = async (id) => {
  const idExists = await User.findById(id);
  if (!idExists) {
    throw new Error(`el id ${id} no existe`);
  }
};
