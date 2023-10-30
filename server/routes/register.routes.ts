import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../utils/data";
const saltRounds = 10;

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc." });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập địa chỉ email hợp lệ." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(200).json({ message: "Đăng ký thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đăng ký thất bại." });
  }
});

export default router;
