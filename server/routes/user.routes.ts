import express, { Request, Response } from "express";
import db from "../utils/data";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const [user] = await db.execute(
      "SELECT user_id, name, email FROM users WHERE user_id = ?",
      [userId]
    );

    if (!Array.isArray(user)) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving user data." });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const selectQuery = "SELECT * FROM users";
    const [users] = await db.execute(selectQuery);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      error,
      message: "Failed to fetch images",
    });
  }
});

export default router;
