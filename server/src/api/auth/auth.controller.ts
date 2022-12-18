import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../connection";

export const userRegister = async (req: Request, res: Response) => {
  let q = "SELECT * FROM users WHERE username = ? || email = ?";
  const { username, password, email } = req.body;

  if (!username || !password || !email)
    return res.status(400).json("Fields are required");

  db.query(q, [username, email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length) return res.status(409).json("User already exits!");

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    // create user
    q = "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";
    const values = [username, email, hashPass];
    db.query(q, [values], (error) => {
      if (err) res.status(500).json(error);
      q = "SELECT * FROM users WHERE username = ?";
      // eslint-disable-next-line @typescript-eslint/no-shadow
      db.query(q, [username], (err, data) => {
        if (err) res.status(500).json(error);

        const token = jwt.sign({ id: data[0].id }, "secretkey");
        // separate password from other data
        const { password: pass, ...other } = data[0];
        res
          .cookie("accessToken", token, {
            httpOnly: true,
          })
          .json({ msg: "User created!", data: other });
      });
    });
  });
};

export const userLogin = async (req: Request, res: Response) => {
  const q = "SELECT * FROM users WHERE email = ?";
  const { email, password } = req.body;

  db.query(q, [email], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const comparePass = bcrypt.compareSync(password, data[0].password);

    if (!comparePass) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // separate password from other data
    const { password: pass, ...other } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ data: other });
  });
};

export const userLogout = (req: Request, res: Response) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
