import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar: React.FC = () => {
  return (
    <div>
      <>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <NavLink
                to="/admin/home"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3" />
                <span>Trang chủ</span>
              </NavLink>
              <NavLink
                to="/admin/products"
                className="salon_btn list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-brands fa-product-hunt fa-fw me-3"></i>
                <span>Product</span>
              </NavLink>
              <NavLink
                to="/admin/orders"
                className="service_btn list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-solid fa-list fa-fw me-3" />
                <span>orders</span>
              </NavLink>
              <NavLink
                to="/admin/users"
                className="customer_btn list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-solid fa-user fa-fw me-3" />
                <span>Customers</span>
              </NavLink>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-solid fa-gear fa-fw me-3" />
                <span>Cài đặt</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-solid fa-right-from-bracket fa-fw me-3" />
                <span>Đăng xuất</span>
              </a>
            </div>
          </div>
        </nav>
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>

            <div
              className="logo"
              style={{ marginRight: "30px", marginLeft: "20px" }}
            >
              <div className="site-logo">
                <a className="js-logo-clone">Haianhshop</a>
              </div>
            </div>
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder="Search"
                style={{ minWidth: 225 }}
              />
              <span className="input-group-text border-0">
                <i className="fas fa-search" />
              </span>
            </form>
            <div className="dropdown" style={{ marginLeft: "1300px" }}>
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bell" />
                <span className="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://i.pinimg.com/236x/55/3e/97/553e979fb595d33403941cace9f5ba62.jpg"
                    className="rounded-circle"
                    height={30}
                    alt="Avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </>
    </div>
  );
};

export default AdminNavbar;
