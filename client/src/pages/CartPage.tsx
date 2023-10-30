import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../helpers/FomatCurrency";
import Swal from "sweetalert2";

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/order")
      .then((response) => {
        setCartData(response.data);
        calculateSubtotal(response.data);
      })
      .catch((error) => {
        console.error("Error loading cart data:", error);
      });
  }, []);

  const calculateSubtotal = (cartItems: any[]) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.product_price * item.product_sale * item.total_number;
    }
    setSubtotal(total);
  };

  const removeFromCart = (productId: number) => {
    axios
      .delete(`http://localhost:3000/api/v1/order/${productId}`)
      .then((response) => {
        setCartData((prevCart) =>
          prevCart.filter((item) => item.product_id !== productId)
        );
        calculateSubtotal(
          cartData.filter((item) => item.product_id !== productId)
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const handleCheckout = () => {
    if (cartData.length > 0) {
      navigate("/checkout/step-1");
    } else {
      Swal.fire(
        "Không thành công",
        "Chưa có sản phẩm nào trong giỏ hàng",
        "warning"
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12">
              <div className="site-blocks-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-name">Size</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.length === 0 ? (
                      <tr>
                        <td colSpan={7}>Chưa có gì trong giỏ hàng</td>
                      </tr>
                    ) : (
                      cartData.map((item) => (
                        <tr key={item.product_id}>
                          <td className="product-thumbnail">
                            <img
                              src={item.product_image}
                              alt="Image"
                              className="img-fluid"
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">
                              {item.product_name}
                            </h2>
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">
                              {item.product_size}
                            </h2>
                          </td>
                          <td>
                            {formatCurrency(
                              item.product_price * item.product_sale
                            )}
                          </td>
                          <td>
                            <div
                              className="input-group mb-3"
                              style={{ maxWidth: 120 }}
                            >
                              <input
                                type="text"
                                disabled
                                className="form-control text-center"
                                defaultValue={item.total_number}
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                              />
                            </div>
                          </td>
                          <td>
                            {formatCurrency(
                              item.product_price *
                                item.product_sale *
                                item.total_number
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => removeFromCart(item.product_id)}
                              className="btn btn-primary height-auto btn-sm"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6">
                  <Link to="/shopping">
                    <button className="btn btn-outline-primary btn-sm btn-block">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-sm px-4">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">
                        Cart Totals
                      </h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        {formatCurrency(subtotal)}
                      </strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        {formatCurrency(subtotal)}
                      </strong>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        onClick={handleCheckout}
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
