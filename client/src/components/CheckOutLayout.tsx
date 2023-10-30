import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../helpers/FomatCurrency";

interface CartItem {
  product_id: number;
  product_image: string;
  product_name: string;
  product_size: string;
  product_price: number;
  product_sale: number;
  total_number: number;
}

const CheckOutLayout: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/order")
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error("Error loading cart data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="CheckoutPage">
        <div className="container">
          <div className="row">
            <Outlet />
            <div className="col-5 order-summary p-5 mt-5">
              <table className="table table-borderless product-table align-middle">
                <thead>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </thead>
                <tbody>
                  {cartData.length > 0 &&
                    cartData.map((e) => (
                      <tr key={e.product_id}>
                        <td className="product-img">
                          <div>
                            <img src={e.product_image} alt="" />
                            <span className="product-count">
                              {e.total_number}
                            </span>
                          </div>
                        </td>
                        <td className="product-name">
                          <span>{e.product_name}</span>
                          <p style={{ fontSize: "12px", color: "#96969" }}>
                            Size: {e.product_size}
                          </p>
                        </td>
                        <td className="product-price text-end">
                          {formatCurrency(
                            (1 - e.product_sale) * e.product_price
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="sale-code d-flex align-items-center gap-2 ">
                <input type="text" placeholder="Mã giảm giá" />
                <button className="btn ">Sử dụng</button>
              </div>

              <div className="product-total">
                <div>
                  <span>Tạm tính</span>
                  <span>
                    {formatCurrency(
                      cartData.reduce(
                        (pre, cur) =>
                          (pre +=
                            cur.total_number *
                            (1 - cur.product_sale) *
                            cur.product_price),
                        0
                      )
                    )}
                  </span>
                </div>
                <div>
                  <span>Phí vận chuyển</span>
                  <span>30.000 VND</span>
                </div>
                <div className="total-price ">
                  <span style={{ fontSize: "20px" }}>Tổng cộng</span>
                  <span>
                    {formatCurrency(
                      cartData.reduce(
                        (pre, cur) =>
                          (pre +=
                            cur.total_number *
                              (1 - cur.product_sale) *
                              cur.product_price +
                            30000),
                        0
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-blocks-cover inner-page py-5" data-aos="fade">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto order-md-2 align-self-start">
              <div className="site-block-cover-content">
                <h2 className="sub-title">New Summer Collection 2024</h2>
                <h1>New clother</h1>
                <p>
                  <a href="#" className="btn btn-black rounded-0">
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6 order-1 align-self-end">
              <img src="images/model_6.png" alt="Image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOutLayout;
