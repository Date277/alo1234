import express, { Request, Response } from "express";
import db from "../utils/data";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { product_id, source } = req.body;

    // Chèn dữ liệu hình ảnh vào cơ sở dữ liệu
    const insertQuery = `
        INSERT INTO media (product_id, source)
        VALUES (?, ?)
      `;

    const result = await db.execute(insertQuery, [product_id, source]);

    // Trả về phản hồi thành công
    res.status(201).json({ message: "Image added successfully" });
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({
      error,
      message: "Failed to add image",
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    // Truy vấn tất cả dữ liệu hình ảnh từ cơ sở dữ liệu
    const selectQuery = "SELECT * FROM media";
    const [mediaRows] = await db.execute(selectQuery);

    res.status(200).json(mediaRows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      error,
      message: "Failed to fetch images",
    });
  }
});

router.put("/:media_id", async (req: Request, res: Response) => {
  try {
    const { media_id } = req.params;
    const { source } = req.body;

    // Xây dựng câu lệnh SQL để cập nhật media dựa trên media_id
    const updateMediaQuery = `
      UPDATE media
      SET
        source = ?
      WHERE media_id = ?
    `;

    await db.execute(updateMediaQuery, [source, media_id]);

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Media updated successfully" });
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({
      error,
      message: "Failed to update media",
    });
  }
});

export default router;
