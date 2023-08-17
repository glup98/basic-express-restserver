import { response } from "express";

export const userGet = (req, res = response) => {
  const { name, apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - Controller",
    name,
    apikey,
    page,
    limit,
  });
};

export const userPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - Controller",
    id,
  });
};
export const userPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: "post API - Controller",
    name,
    age,
  });
};
export const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API - Controller",
  });
};
