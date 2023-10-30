import React, { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/FomatCurrency";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ShoppingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const pageSize = 6; // Số sản phẩm trên mỗi trang
  const totalPage = Math.ceil(totalCount / pageSize);

  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/product?keySearch=&limit=${currentPage}&offset=${pageSize}`
      )
      .then((response) => {
        setProducts(response.data.data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleProductDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="custom-border-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">All</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 order-1">
              <div className="row align">
                <div className="col-md-12 mb-5">
                  <div className="float-md-left">
                    <h2 className="text-black h5">
                      <a>Product</a>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                {products.map((product) => (
                  <div
                    key={product.product_id}
                    className="col-lg-4 col-md-4 item-entry mb-4 "
                  >
                    <div
                      onClick={() => handleProductDetail(product.product_id)}
                      className="product-anh"
                    >
                      <a className="anh-adding">
                        <p className="addtocart-anh">INFOR</p>

                        <img
                          style={{ height: "350px", width: "100%" }}
                          src={product.first_image}
                          alt="Image"
                          className="img-fluid "
                        />

                        <h2
                          style={{ marginTop: "10px" }}
                          className="item-title"
                        >
                          <h5>{product.name}</h5>

                          <i
                            style={{
                              color: "gray",
                              margin: "0px 20px 0px 20px",
                            }}
                          >
                            {product.intro}
                          </i>
                        </h2>

                        <strong
                          className="item-price "
                          style={{ marginLeft: "200px" }}
                        >
                          {formatCurrency(product.price)}
                        </strong>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
                {/* pagination */}
                <nav aria-label="...">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      } `}
                      onClick={handlePrev}
                    >
                      <div className="page-link">Previous</div>
                    </li>

                    <li className="page-item active" aria-current="page">
                      <div className="page-link">
                        {currentPage}{" "}
                        <span className="visually-hidden">(current)</span>
                      </div>
                    </li>

                    <li
                      className={`page-item ${
                        currentPage === totalPage ? "disabled" : ""
                      }`}
                      onClick={handleNext}
                    >
                      <div className="page-link">Next</div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingPage;
