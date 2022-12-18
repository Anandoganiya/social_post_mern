import { Request, Response } from "express";
import moment from "moment";
import db from "../../connection";

export const getAllPosts = (req: Request, res: Response) => {
  const q =
    "SELECT p.*,username FROM posts AS p JOIN users AS u ON (p.userId = u.id)";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ err: err });
    res.json({ data: data });
  });
};

export const createPost = (req: Request, res: Response) => {
  const image = req.file?.buffer.toString("base64");
  const q =
    "INSERT INTO posts (`description`,`title`,`postImage`,`createdAt`,`userId`) VALUES (?)";
  const { desc, title, userId } = req.body;

  if (!desc || !title)
    return res.status(400).json({ message: "Fields are required" });
  if (!userId) return res.status(400).json("Auth id not provided");

  const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const values = [desc, title, image, createdAt, userId];
  db.query(q, [values], (err, result) => {
    if (err) return res.status(500).json({ err: err });
    res.json({ status: "Post has been created", data: result });
  });
};

export const updatePost = (req: Request, res: Response) => {
  const image = req.file?.buffer.toString("base64");
  const { desc: description, title, userId } = req.body;
  if (!userId) return res.status(400).json("Auth id not provided");
  const reqData = {
    description,
    title,
    postImage: image,
    userId: Number(userId),
  };

  let postData = {};
  Object.entries(reqData).forEach(([key, value]) => {
    if (value) Object.assign(postData, { [key]: value });
  });

  if (!Object.keys(postData).length)
    return res.status(400).json("Nothing to update");

  const q =
    "Update posts SET " +
    Object.keys(postData)
      .map((key) => `${key} = ?`)
      .join(", ") +
    " WHERE id = ?";

  const values = Object.values(postData);

  db.query(q, [...values, userId], (err, result) => {
    if (err) return res.status(500).json({ err: err });
    res.json({ status: "Post has been updated", data: result });
  });
};

export const deletePost = (req: Request, res: Response) => {
  const { postId } = req.body;
  const q = "DELETE FROM posts WHERE id = ?";

  db.query(q, [postId], (err, result) => {
    if (err) return res.status(500).json({ err: err });
    res.json({ status: "Post has been deleted", data: result });
  });
};
