import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    console.log(loginData);

    axios
      .post("http://localhost:3000/api/v1/login", loginData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem("userID", response.data.user.user_id);
          navigate("/");
        } else {
          setErrorMessage("Tài khoản hoặc mật khẩu không đúng.");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Tài khoản hoặc mật khẩu không đúng.");
      });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img
                  style={{ width: "10%", marginRight: "10px" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JbFcfJaq16vHz4t8mdogHTdMyY_UNXUyWW_GM7fydMC0MJU0huPeT17pykzsUJpAMts&usqp=CAU"
                  alt=""
                />
                <span className="h1 fw-bold mb-0">HaiAnhShop</span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="formControlLg"
                type="email"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span style={{ color: "red" }} className="error-message">
                {errorMessage}
              </span>
              <MDBBtn
                onClick={handleLogin}
                className="mb-4 px-5"
                color="dark"
                size="lg"
              >
                Login
              </MDBBtn>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
