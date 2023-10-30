import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatCurrency } from "../helpers/FomatCurrency";

interface Product {
  product_id: number;
  name: string;
  intro: string;
  category_name: string;
  number: number;
  price: number;
  sale: number;
}

const AdminProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 6; // Số sản phẩm trên mỗi trang
  const totalPage = Math.ceil(totalCount / pageSize);

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

  const calculateSTT = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/v1/product/${id}`)
      .then(() => {
        Swal.fire("Thành Công", "Sản phẩm đã được xóa", "success");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div className="Product-giang">
        <NavLink to="/admin/products/add">
          <button type="button" className="btn btn-success">
            Add new product
          </button>
        </NavLink>
      </div>
      <table className="table">
        <thead>
          <tr className="table-primary text-center ">
            <th scope="col">STT</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Introduce</th>
            <th scope="col">Catagol</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Sale</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((e, i) => (
            <tr className="text-center" key={e.product_id}>
              <th scope="row">{calculateSTT(i)}</th>
              <td>00032{e.product_id}</td>
              <td>{e.name}</td>
              <td>{e.intro}</td>
              <td>{e.category_name}</td>
              <td>{e.number}</td>
              <td>{formatCurrency(e.price)}</td>
              <td>{e.sale * 100}%</td>
              <td>
                <button
                  onClick={() => handleEdit(e.product_id)}
                  type="button"
                  className="btn btn-info"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
                <button
                  onClick={() => handleDelete(e.product_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <nav aria-label="...">
        <ul className="pagination">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""} `}
            onClick={handlePrev}
          >
            <div className="page-link">Previous</div>
          </li>

          <li className="page-item active" aria-current="page">
            <div className="page-link">
              {currentPage} <span className="visually-hidden">(current)</span>
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
  );
};

export default AdminProduct;
