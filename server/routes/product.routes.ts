import express, { Request, Response } from "express";
import db from "../utils/data";
import { RowDataPacket } from "mysql2";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const keySearch = req.query.keySearch;
  const limit = req.query.limit;
  const offset = req.query.offset;

  try {
    let [data] = await db.execute<RowDataPacket[]>(
      "call shopping_project.Proc_product_getAndPaging(?,?,?)",
      [keySearch, limit, offset]
    );

    // Số lượng bản ghi tìm thấy
    const totalCount = data[0][0].total;

    // Danh sách bản ghi tìm thấy
    const products = data[1];

    return res.status(200).json({
      status: 200,
      totalCount: totalCount,
      data: products,
    });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      error,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    let result = await db.execute<RowDataPacket[]>(
      `SELECT p.*, m.source, c.category_name
      FROM products as p INNER JOIN media as m
      ON p.product_id = m.product_id
      INNER JOIN category as c
      ON c.category_id = p.category_id 
      WHERE p.product_id = ?`,
      [id]
    );

    if (Array.isArray(result)) {
      const rows = result[0];
      if (rows.length === 0) {
        res.status(404).json({
          message: "Product not found",
        });
      } else {
        const product = {
          product_id: rows[0].product_id,
          name: rows[0].name,
          intro: rows[0].intro,
          price: rows[0].price,
          number: rows[0].number,
          sale: rows[0].sale,
          sources: rows.map((row) => row.source),
          category_name: rows[0].category_name,
          category_id: rows[0].category_id,
        };
        res.status(200).json(product);
      }
    } else {
      res.status(500).json({
        message: "Error in fetching data",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, price, sale, number, intro, category_id } = req.body;

    // Kiểm tra xem price có phải là một số hợp lệ hay không
    const priceAsInt = parseInt(price, 10);

    if (isNaN(priceAsInt)) {
      res.status(400).json({
        message: "Invalid price value. Price must be a valid integer.",
      });
    } else {
      // Thực hiện thao tác chèn vào cơ sở dữ liệu với giá trị priceAsInt là một số nguyên
      const insertQuery = `
        INSERT INTO products (name, price, sale, number, intro, category_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const result = await db.execute(insertQuery, [
        name,
        priceAsInt,
        sale,
        number,
        intro,
        category_id,
      ]);

      res.status(201).json({ message: "Product added successfully" });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      error,
      message: "Failed to add product",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      sale,
      number,
      intro,
      category_id,
      /* Thêm các trường cần cập nhật tại đây */
    } = req.body;

    // Xây dựng câu lệnh SQL để cập nhật product dựa trên id
    const updateProductQuery = `
      UPDATE products
      SET
        name = ?,
        price = ?,
        sale = ?,
        number = ?,
        intro = ?,
        category_id = ?
        /* Thêm các trường cần cập nhật tại đây */
      WHERE product_id = ?
    `;

    // Tạo một mảng giá trị cần truyền vào câu lệnh SQL
    const values = [
      name || null,
      price || null,
      sale || null,
      number || null,
      intro || null,
      category_id || null,
      /* Thêm các giá trị tương ứng tại đây */
      id, // id sản phẩm cần cập nhật
    ];

    await db.execute(updateProductQuery, values);

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      error,
      message: "Failed to update product",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Xóa sản phẩm dựa trên id
    const deleteProductQuery = `
      DELETE FROM products
      WHERE product_id = ?
    `;

    await db.execute(deleteProductQuery, [id]);

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      error,
      message: "Failed to delete product",
    });
  }
});

export default router;
