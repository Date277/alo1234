import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface Product {
  product_id: string;
  name: string;
  intro: string;
  price: string;
  sale: string;
  number: string;
  category_id: string;
}

interface Media {
  media_id: string;
  source: string;
  product_id: number;
  newSource?: string;
}

function AdminProductDetail() {
  const [product, setProduct] = useState<Product>({
    product_id: "",
    name: "",
    intro: "",
    price: "",
    sale: "",
    number: "",
    category_id: "",
  });
  const [productMedia, setProductMedia] = useState<Media[]>([]);

  const [productId, setProductId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [sale, setSale] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("1");

  const navigate = useNavigate();

  const BASE_API = "http://localhost:3000/api/v1";
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await axios.get<Product>(`${BASE_API}/product/${id}`);
        const data = response.data;

        setProduct({ ...data });
        setProductId(data.product_id);
        setName(data.name);
        setIntro(data.intro);
        setPrice(data.price);
        setSale(data.sale);
        setNumber(data.number);
        setCategory(data.category_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        let response = await axios.get<Media[]>(`${BASE_API}/media`);
        const mediaData = response.data;

        const initialProductMedia = mediaData
          .filter((media) => media.product_id === (id ? parseInt(id, 10) : -1))
          .map((media) => ({
            ...media,
            newSource: media.source,
          }));

        setProductMedia(initialProductMedia);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, [id]);

  const updateMediaAndProduct = async () => {
    try {
      // Cập nhật thông tin sản phẩm
      const updatedProductData = {
        name,
        intro,
        price,
        sale,
        number,
        category_id: category,
      };

      await axios.put<Product>(
        `${BASE_API}/product/${productId}`,
        updatedProductData
      );

      // Cập nhật thông tin ảnh
      const updateMediaPromises = productMedia.map(async (item) => {
        if (item.media_id) {
          const updatedMediaData = {
            source: item.newSource || item.source,
          };

          // Sử dụng media_id để cập nhật media cụ thể
          await axios.put(
            `${BASE_API}/media/${item.media_id}`,
            updatedMediaData
          );
        }
      });

      // Đợi cho tất cả các yêu cầu PUT cập nhật ảnh hoàn thành
      await Promise.all(updateMediaPromises);

      Swal.fire("Thành Công", "Sản phẩm đã được update", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error updating product and media:", error);
      // Xử lý lỗi và hiển thị thông báo lỗi nếu cần
    }
  };

  return (
    <div>
      <h3>Update Product #ID: 00032{productId}</h3>
      <div className="flex-phuc">
        <div style={{ width: "45%" }}>
          <div
            style={{ display: "flex", gap: "3%", marginTop: "3%" }}
            className="them"
          >
            <div style={{ width: "100%" }} className="">
              <span>Name: </span>
              <br />
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <span>Intro: </span>
              <br />
              <input
                type="text"
                name="intro"
                className="form-control"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
              <br />
              <span>Number:</span>
              <br />
              <input
                type="text"
                name="number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <br />
              <span>Price:</span>
              <br />
              <input
                type="text"
                name="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <span>Sale: </span> <br />
              <input
                type="text"
                name="sale"
                className="form-control"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
              />
              <br />
              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select
                  name="category_id"
                  className="form-select"
                  aria-label="Default select example"
                  value={category} // Sử dụng value thay vì defaultValue
                  onChange={(e) => setCategory(e.target.value)}
                >
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
            onClick={updateMediaAndProduct}
          >
            Save
          </button>

          <Link to="/admin/products">
            <button
              style={{ width: "105px", height: "44px" }}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </Link>
        </div>

        <div style={{ width: "80%" }}>
          <h4>Ảnh hiện tại: </h4>
          <div className="anh-tong">
            {productMedia.map((item, index) => (
              <div className="anh-haianh" key={index}>
                <img className="column-anh" src={item.source} alt="" />

                <input
                  type="text"
                  className="input-trang"
                  placeholder="Nhập link ảnh mới"
                  onChange={(e) => {
                    const newSource = e.target.value;
                    setProductMedia((prevProductMedia) => {
                      const updatedMedia = [...prevProductMedia];
                      updatedMedia[index] = {
                        ...updatedMedia[index],
                        newSource,
                      };
                      return updatedMedia;
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetail;
