export const login = async (req, res) => {
  const { email, password } = req.body;
  res.json({
    msg: "login ok",
    email,
    password,
  });
};
