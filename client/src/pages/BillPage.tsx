import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface OrderData {
  order_id: number;
  email: string;
  order_name: string;
  phone: string;
  ward: string;
  district: string;
  province: string;
}

const BillPage: React.FC = () => {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const orderid = localStorage.getItem("orderID");

  useEffect(() => {
    if (orderid) {
      axios
        .get(`http://localhost:3000/api/v1/checkout/${orderid}`)
        .then((response) => {
          setOrderData(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        });
    }
  }, [orderid]);

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:3000/api/v1/order`)
      .then((response) => {
        console.log("Xóa thành công", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi xóa", error);
      });

    navigate("/");
  };

  return (
    <div className="col-7 pt-5 mt-5 bill-content">
      <div className="success-icon">
        <i className="fa-regular fa-circle-check"></i>
      </div>
      <h3 className="title">HaiAnhShop</h3>
      <div className="bill-title">
        <h4>Đặt hàng thành công</h4>
        <span>Mã đơn hàng #000032{orderData?.order_id || "00032"}</span>
        <p>Cảm ơn bạn đã mua hàng</p>
        <span>
          Chúng tôi đã gửi đơn hàng đến &nbsp;
          <i>{orderData?.email || "Your Email"}</i>, vui lòng theo dõi đơn hàng
        </span>
      </div>

      <div className="bill-info">
        <h4>Thông tin đơn hàng</h4>
        <ul className="list-unstyled">
          <li>
            <b>Họ và tên:</b> {orderData?.order_name || "Your Name"}
          </li>
          <li>
            <b>Điện thoại:</b> {orderData?.phone || "Your Phone"}
          </li>
          <li>
            <b>Email:</b> {orderData?.email || "Your Email"}
          </li>
          <li>
            <b>Phường/Xã:</b> {orderData?.ward || "Your Ward"}
          </li>
          <li>
            <b>Quận/Huyện:</b> {orderData?.district || "Your District"}
          </li>
          <li>
            <b>Tỉnh/Thành Phố:</b>{" "}
            {orderData?.province || "Your Province, Việt Nam"}
          </li>
        </ul>
        <p>Phương thức thanh toán</p>
        <span>Thanh toán khi giao hàng</span>
      </div>
      <div className="d-flex justify-content-between align-items-center pt-4">
        <div>
          Cần hỗ trợ?
          <Link
            to="/"
            style={{ color: "#338dbc", fontSize: "" }}
            className="text-decoration-none"
          >
            Liên hệ chúng tôi
          </Link>
        </div>
        <Link
          to={""}
          className="btn btn-primary continue-btn"
          onClick={handleContinue}
        >
          Tiếp tục mua hàng
        </Link>
      </div>
    </div>
  );
};

export default BillPage;
