import express, { Request, Response } from "express";
import db from "../utils/data";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { size, quantity, product_id, user_id } = req.body;

    if (!size || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ." });
    }

    const insertOrderQuery =
      "INSERT INTO order_detail (size, number, product_id, user_id) VALUES (?, ?, ?, ?)";

    const [results] = await db.execute(insertOrderQuery, [
      size,
      quantity,
      product_id,
      user_id,
    ]);

    console.log("Đã đặt hàng thành công.");

    res.status(201).json({ message: "Đặt hàng thành công." });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đặt hàng:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đặt hàng." });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.execute(`
      SELECT 
      products.product_id,
      products.name AS product_name, 
      products.price AS product_price, 
      products.sale AS product_sale,
      (
          SELECT source
          FROM media
          WHERE media.product_id = products.product_id
          LIMIT 1
      ) AS product_image,
      order_detail.size AS product_size,
      SUM(order_detail.number) AS total_number,
      SUM(products.price - (products.price * products.sale)) AS total_discount_price
      FROM 
      order_detail
      JOIN 
      products ON order_detail.product_id = products.product_id
      GROUP BY
      products.product_id, 
      product_name, 
      product_price, 
      product_sale, 
      product_image, 
      product_size
    `);

    const [rows] = result;
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      error,
      message: "Failed to fetch images",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    // Nếu sản phẩm tồn tại, thực hiện xóa
    const deleteOrderQuery = "DELETE FROM order_detail WHERE product_id = ? ";
    await db.execute(deleteOrderQuery, [productId]);

    res
      .status(200)
      .json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng." });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    // Thực hiện xóa tất cả dữ liệu trong bảng order_detail
    const deleteAllOrderDetailQuery = "DELETE FROM order_detail";
    await db.execute(deleteAllOrderDetailQuery);

    res.status(200).json({
      message: "Tất cả dữ liệu trong bảng order_detail đã được xóa thành công.",
    });
  } catch (error) {
    console.error("Lỗi khi xóa tất cả dữ liệu trong bảng order_detail:", error);
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xóa tất cả dữ liệu trong bảng order_detail.",
    });
  }
});

export default router;
