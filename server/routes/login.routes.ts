import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../utils/data";
import mysql, { RowDataPacket } from "mysql2";

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập tài khoản và mật khẩu.",
    });
  }

  try {
    const [userResult] = await db.execute<RowDataPacket[]>(
      "SELECT user_id, name, email, password FROM users WHERE email = ?",
      [email]
    );
    console.log("concaird", userResult);

    if (!userResult.length) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không đúng.",
      });
    }

    const userRow: any = userResult[0];

    const user: User = userRow as any;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không đúng.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Đăng nhập thành công.", user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi đăng nhập. Vui lòng thử lại." });
  }
});

export default router;
