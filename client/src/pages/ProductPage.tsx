import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../helpers/FomatCurrency";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCarousel from "../components/ProductCarousel";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { id } = useParams<any>();

  const userID = localStorage.getItem("userID");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      console.log("vu ngu", res);

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (value: number) => {
    if (quantity + value >= 1) {
      setQuantity(quantity + value);
    }
  };

  const handleAddToCart = () => {
    const cart = {
      user_id: userID,
      product_id: id,
      size: selectedSize,
      quantity: quantity,
    };
    axios
      .post("http://localhost:3000/api/v1/order", cart)
      .then((response) => {
        Swal.fire(
          "Thành Công",
          "Bạn đã thêm sản phẩm vào giỏ hàng thành công",
          "success"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ProductPage">
      <Header />
      <div className="custom-border-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">
                <i className="product-sku">SKU: 00032{product.product_id}</i>
              </strong>
            </div>
          </div>
        </div>
      </div>

      <section
        className="container product-detail"
        style={{ marginTop: "10px" }}
      >
        <div className="row">
          <div className="col-5">
            {product?.sources?.length ? (
              <ProductCarousel sources={product?.sources} />
            ) : (
              ""
            )}
          </div>
          <div className="col-4">
            <div className="row">
              <h3 className="product-name">{product.name}</h3>

              <p className="mini-description">
                <span className="mini-description-item product-origin">
                  <b>Thương hiệu</b>: {product.category_name}
                </span>
                <span className="mini-description-item product-status">
                  <b>Tình trạng</b>: (
                  {product.number === 0 ? "Hết hàng" : "Còn hàng"})
                </span>
              </p>
            </div>
            <div className="product-price d-flex gap-1 align-items-end">
              <div>
                <b className="sale-price">
                  {product.sale &&
                    formatCurrency(product?.price * product?.sale)}
                </b>
                <span
                  className={product?.sale ? `full-price sale` : `full-price`}
                >
                  {product?.price && formatCurrency(product?.price)}
                </span>
                <span className="product-sale text-white">
                  {product.sale * 100}%
                </span>
              </div>
            </div>
            <div className="product-weight">
              <p>Introduce :</p>
              <div>{product.intro}</div>
            </div>
            <div className="product-weight">
              <p>Size :</p>
              <div className="d-flex gap-2">
                <button
                  className={`btn btn-outline-secondary ${
                    selectedSize === "M" ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange("M")}
                >
                  M
                </button>
                <button
                  className={`btn btn-outline-secondary ${
                    selectedSize === "S" ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange("S")}
                >
                  S
                </button>
                <button
                  className={`btn btn-outline-secondary ${
                    selectedSize === "XL" ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange("XL")}
                >
                  XL
                </button>
              </div>
            </div>
            <div className="product-weight">
              <p>Quantity :</p>
              <div className="quantity-area d-flex mt-4">
                <button
                  className="btn-hai"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input type="text" value={quantity} readOnly />
                <button
                  className="btn-hai"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="product-order pt-4 d-flex gap-3">
              <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            </div>
          </div>
          <div className="col-3">
            <div>
              <ul className="list-group product-service">
                <li className="list-group-item">
                  <i className="fa-solid fa-plane-departure"></i>
                  <span>Giao hàng toàn quốc</span>
                </li>
                <li className="list-group-item">
                  <i className="fa-regular fa-calendar-days"></i>
                  <span>Chính hãng 100% - Nhận hàng trong 2 giờ</span>
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Được kiểm tra hàng trước khi nhận</span>
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-lock"></i>
                  <span>Đổi trả trong 48h nếu không hài lòng</span>
                </li>
                <li className="list-group-item">
                  <i className="fa-solid fa-dna"></i>
                  <span> Sản phẩm đã được chứng nhận</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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

export default ProductPage;
