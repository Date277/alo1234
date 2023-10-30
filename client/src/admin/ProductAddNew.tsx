import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductAddNew: React.FC = () => {
  const [productData, setProductData] = useState({
    name: "",
    intro: "",
    number: "",
    price: "",
    sale: "",
    category_id: 1,
  });

  const [imageData, setImageData] = useState<any>({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setImageData({
      ...imageData,
      [name]: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProductData({
      ...productData,
      category_id: parseInt(value),
    });
  };

  const handleAddProduct = () => {
    axios
      .post("http://localhost:3000/api/v1/product", productData)
      .then(() => {
        axios
          .get(
            "http://localhost:3000/api/v1/product?keySearch=&limit=1&offset=1000"
          )
          .then((response) => {
            // Tìm `product_id` lớn nhất trong danh sách sản phẩm
            let maxProductId = 0;
            console.log("Product", response.data.data);
            response.data.data.forEach((product: { product_id: number }) => {
              if (product.product_id > maxProductId) {
                maxProductId = product.product_id;
              }
            });

            // Lưu `maxProductId` vào localStorage
            localStorage.setItem("productId", maxProductId.toString());

            // Đặt lại giá trị của các ô input
            setProductData({
              name: "",
              intro: "",
              number: "",
              price: "",
              sale: "",
              category_id: 1,
            });
          })
          .catch((error) => {
            console.error("Error getting the latest product:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding the product:", error);
      });
  };

  const handleSaveChanges = () => {
    const productId = localStorage.getItem("productId");

    // Gửi dữ liệu hình ảnh lên API cho từng source
    const imageSources = [];
    for (let i = 1; i <= 4; i++) {
      const sourceKey: string = `img${i}`;

      const sourceValue = imageData[sourceKey];

      // Chỉ gửi các ô input có giá trị
      if (sourceValue) {
        const imageObject = {
          product_id: productId,
          source: sourceValue,
        };

        axios
          .post("http://localhost:3000/api/v1/media", imageObject)
          .then(() => {
            // Xử lý phản hồi từ API nếu cần
            console.log(`Image ${i} uploaded successfully`);
          })
          .catch((error) => {
            console.error(`Error uploading image ${i}:`, error);
          });

        imageSources.push(imageObject);
      }
    }
    setImageData({
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    });
    Swal.fire("Thành Công", "Sản phẩm đã được thêm", "success");
  };

  return (
    <div>
      <div>
        <h3>Add New Product</h3>
        <div style={{ marginLeft: "10px " }}>
          <div
            style={{ display: "flex", gap: "3%", marginTop: "3%" }}
            className="them"
          >
            <div style={{ width: "30%" }} className="">
              <span>Name: </span>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <span>Intro: </span>
              <br />
              <input
                type="text"
                name="intro"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <span>Number:</span>
              <br />
              <input
                type="text"
                name="number"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <span>Price:</span>
              <br />
              <input
                type="text"
                name="price"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <span>Sale: </span> <br />
              <input
                type="text"
                name="sale"
                className="form-control"
                onChange={handleInputChange}
              />
              <br />
              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select
                  name="category_id"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCategoryChange}
                >
                  <option>Category</option>
                  <option value="1">Men</option>
                  <option value="2">Women</option>
                  <option value="3">Children</option>
                </select>
              </div>
            </div>
            <br />
          </div>

          <button
            style={{ marginRight: "20px" }}
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleAddProduct}
          >
            Add Photo
          </button>

          <button
            style={{ width: "105px", height: "44px" }}
            className="btn btn-danger"
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/admin/products"
            >
              Cancel
            </Link>
          </button>

          {/* modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div style={{ width: "100%" }} className="">
                    <span>Image1 :</span> <br />
                    <input
                      type="text"
                      name="img1"
                      className="form-control"
                      onChange={handleImageInputChange}
                    />
                    <br />
                    <span>Image2:</span> <br />
                    <input
                      type="text"
                      name="img2"
                      className="form-control"
                      onChange={handleImageInputChange}
                    />
                    <br />
                    <span>Image3:</span> <br />
                    <input
                      type="text"
                      name="img3"
                      className="form-control"
                      onChange={handleImageInputChange}
                    />
                    <br />
                    <span>Image4:</span> <br />
                    <input
                      type="text"
                      name="img4"
                      className="form-control"
                      onChange={handleImageInputChange}
                    />
                    <br />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddNew;
