import express, { Request, Response } from "express";
import { getDate } from "../helpers";
import db from "../utils/data";
import mysql from "mysql2";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, user_id, email, phone, address, province, district, ward } =
      req.body;

    // Kiểm tra xem tất cả thông tin cần thiết đã được cung cấp
    if (
      !name ||
      !user_id ||
      !email ||
      !phone ||
      !address ||
      !province ||
      !district ||
      !ward
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đủ thông tin." });
    }

    // Chèn dữ liệu vào bảng orders để tạo đơn hàng mới
    const sql = mysql.format(
      "INSERT INTO ?? (order_name, user_id, created_at, status, email, phone, address, province, district, ward) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)",
      [
        "orders",
        name,
        user_id,
        1, // Trạng thái mặc định
        email,
        phone,
        address,
        province,
        district,
        ward,
      ]
    );

    const [result]: any = await db.execute(sql);
    console.log("result: ", result);

    if (result) {
      const insertId = result.insertId as any;
      res.status(201).json({
        message: "Đặt hàng thành công",
        orderId: insertId,
      });
    } else {
      console.error("Không có ID trả về sau khi thêm đơn hàng.");
      res.status(500).json({ message: "Lỗi khi thêm đơn hàng." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    let sql = "SELECT * FROM orders WHERE order_id = ?";
    let result = await db.execute<mysql.RowDataPacket[]>(sql, [orderId]);

    if (Array.isArray(result) && result.length > 0) {
      res.status(200).json(result[0][0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    let selectQuery = `
      SELECT * FROM orders
      ORDER BY created_at DESC`;

    if (req.query.status) {
      const status = req.query.status as string;

      if (status === "ALL") {
        // Trường hợp trạng thái là "ALL", không cần điều kiện WHERE
        const [rows] = await db.execute(selectQuery);
        res.status(200).json(rows);
      } else {
        // Trường hợp trạng thái khác "ALL"
        const statusMapping: Record<string, number> = {
          accepted: 1,
          delivering: 2,
          "cancel order": 3,
          delivered: 4,
        };

        if (statusMapping[status]) {
          selectQuery = `
            SELECT * FROM orders
            WHERE status = ?
            ORDER BY created_at DESC`;
          const [rows] = await db.execute(selectQuery, [statusMapping[status]]);
          res.status(200).json(rows);
        } else {
          res.status(400).json({
            message: "Trạng thái không hợp lệ.",
          });
        }
      }
    } else {
      const [rows] = await db.execute(selectQuery);
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu đơn hàng:", error);
    res.status(500).json({
      error,
      message: "Lấy dữ liệu đơn hàng thất bại",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update the order status in the database
    const updateQuery = "UPDATE orders SET status = ? WHERE order_id = ?";
    await db.execute(updateQuery, [status, id]);

    // Send a success response
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error, message: "Failed to update order status" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Lấy trạng thái của đơn hàng trước khi xóa
    const getStatusQuery = "SELECT status FROM orders WHERE order_id = ?";
    const [statusRows] = await db.execute(getStatusQuery, [id]);

    // Kiểm tra nếu statusRows là một mảng hợp lệ và không rỗng
    if (Array.isArray(statusRows) && statusRows.length > 0) {
      const orderStatus = (statusRows[0] as any).status; // Sử dụng 'as any' để tránh lỗi TypeScript
      // Tiếp tục xử lý trạng thái đơn hàng
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Nếu trạng thái không phải 1 hoặc 2, thực hiện xóa đơn hàng
    const deleteQuery = "DELETE FROM orders WHERE order_id = ?";
    await db.execute(deleteQuery, [id]);

    // Trả về thông báo xóa thành công
    res.status(200).json({ message: "Đã xóa đơn hàng thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({ error, message: "Lỗi khi xóa đơn hàng" });
  }
});

export default router;
