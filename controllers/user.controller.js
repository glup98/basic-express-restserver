import { response } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const userGet = async (req, res = response) => {
  const { from, limit = 5 } = req.query;
  const query = { state: true };
  const [total, users] = await Promise.all([
    await User.countDocuments(query),
    User.find(query).limit(limit).skip(from),
  ]);
  res.json({ total, users });
};

export const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;
  // TODO validar contra base de datos
  if (password) {
    // Ecriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });
  console.log(user);
  res.json(user);
};

export const userPost = async (req, res = response) => {
  // const { name, email, password, role } = req.body;
  const { google, ...rest } = req.body;
  const user = new User(rest);

  // Ecriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(rest.password, salt);

  // Guardar en DB
  await user.save();
  res.json({
    user,
  });
};

export const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json({
    user,
  });
};

/*
//Delete Fisico:
export const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.json({
    user,
  });
};*/
