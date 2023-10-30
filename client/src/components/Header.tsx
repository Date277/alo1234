import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface HeaderProps {
  // Define any props if needed
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/${userID}`
        );
        setUserName(response.data.user.name);
        setLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div style={{ borderBottom: "0.1px solid rgb(230, 230, 230)" }}>
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-4 hidden-xs">
              {/* Default Welcome Message */}
              <div className="welcome-msg ">Welcome to HaiAnhShop </div>
              <span className="phone hidden-sm">Call Us: +084.348.437</span>
            </div>
            {/* top links */}
            <div className="headerlinkmenu col-lg-8 col-md-7 col-sm-8 col-xs-12">
              <div className="links">
                {loggedIn ? (
                  <div className="myaccount">
                    <a title="My Account">
                      <i className="fa fa-user" />
                      <span className="hidden-xs">{userName}</span>
                    </a>
                    <a onClick={handleLogout}>
                      <i className="fa fa-sign-out" />
                      <span className="hidden-xs">Log Out</span>
                    </a>
                  </div>
                ) : (
                  <div className="myaccount">
                    <a title="My Account">
                      <i className="fa fa-user" />
                      <span className="hidden-xs">My Account</span>
                    </a>
                    <div className="login">
                      <Link to="/login">
                        <i className="fa fa-unlock-alt" />
                        <span className="hidden-xs">Log In</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-navbar bg-white py-2">
        <div className="search-wrap">
          <div className="container">
            <a href="#" className="search-close js-search-close">
              <span className="icon-close2" />
            </a>
            <form action="#" method="post">
              <input
                type="text"
                className="form-control"
                placeholder="Search keyword and hit enter..."
              />
            </form>
          </div>
        </div>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <Link to="/" className="js-logo-clone">
                  Haianhshop
                </Link>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav
                className="site-navigation text-right text-md-center"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/shopping">Shop</Link>
                  </li>
                  <li className="has-children">
                    <a>Catalogue</a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Men</a>
                      </li>
                      <li>
                        <a href="#">Women</a>
                      </li>
                      <li>
                        <a href="#">Children</a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="/about">about</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="icons">
              <a href="#" className="icons-btn d-inline-block js-search-open">
                <span className="icon-search" />
              </a>
              <a href="#" className="icons-btn d-inline-block">
                <span className="icon-heart-o" />
              </a>
              <Link to="/cart" className="icons-btn d-inline-block bag">
                <span className="icon-shopping-bag" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
