import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

type Order = {
  order_id: number;
  order_name: string;
  created_at: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  status: string;
};

const AdminOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const fetchOrders = () => {
    axios
      .get(`http://localhost:3000/api/v1/checkout?status=${selectedStatus}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId);

    if (!orderToUpdate) {
      console.error("Order not found");
      return;
    }

    const disallowedStatusesAfterDelivering = ["1"];

    const lockedStatuses = ["3", "4"];

    if (orderToUpdate.status === "2") {
      if (disallowedStatusesAfterDelivering.includes(newStatus)) {
        console.error("Cannot select 'accepted' after 'delivering'");
        return;
      }
    }

    if (lockedStatuses.includes(orderToUpdate.status)) {
      console.error("Cannot change status after it is locked");
      return;
    }

    axios
      .put(`http://localhost:3000/api/v1/checkout/${orderId}`, {
        status: newStatus,
      })
      .then(() => {
        const updatedOrders = orders.map((order) => {
          if (order.order_id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleDelete = (orderId: number, orderStatus: string) => {
    if (orderStatus === "1" || orderStatus === "2") {
      Swal.fire(
        "Thất bại",
        "Không thể xóa đơn hàng đã được chấp nhận hoặc đang giao hàng!",
        "error"
      );
    } else {
      axios
        .delete(`http://localhost:3000/api/v1/checkout/${orderId}`)
        .then(() => {
          const updatedOrders = orders.filter(
            (order) => order.order_id !== orderId
          );
          setOrders(updatedOrders);
          Swal.fire("Thành Công", "Sản phẩm đã được xóa", "success");
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  return (
    <div>
      <h1>Order Management</h1>

      <div className="dropdown" style={{ margin: "20px 0px 15px 0px" }}>
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedStatus}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a
              className="dropdown-item"
              onClick={() => setSelectedStatus("ALL")}
            >
              ALL
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setSelectedStatus("accepted")}
            >
              accepted
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setSelectedStatus("delivering")}
            >
              delivering
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setSelectedStatus("cancel order")}
            >
              cancel order
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setSelectedStatus("delivered")}
            >
              delivered
            </a>
          </li>
        </ul>
      </div>
      <table className="table">
        <thead>
          <tr className="table-primary text-center">
            <th scope="col">STT</th>
            <th scope="col">ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Set row time</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((e, i) => (
            <tr className="text-center" key={e.order_id}>
              <th scope="row">{i + 1}</th>
              <td>00032{e.order_id}</td>
              <td>{e.order_name}</td>
              <td>{e.created_at}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>
                {e.address}, {e.ward}, {e.district}, {e.province}
              </td>
              <td>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={e.status}
                  onChange={(event) =>
                    handleStatusChange(e.order_id, event.target.value)
                  }
                >
                  <option value="1">accepted</option>
                  <option value="2">delivering</option>
                  <option value="3">cancel order</option>
                  <option value="4">delivered</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(e.order_id, e.status)}
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
    </div>
  );
};

export default AdminOrder;
