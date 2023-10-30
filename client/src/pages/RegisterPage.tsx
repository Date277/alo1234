import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  let navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Reset previous errors
    setErrors({
      name: "",
      email: "",
      password: "",
      rePassword: "",
    });

    // Reset errorMessage
    setErrorMessage("");

    // Validation
    let isValid = true;

    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter your name.",
      }));
      isValid = false;
    }

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email.",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }

    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter your password.",
      }));
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must have at least 1 uppercase letter, 1 digit, and 8 characters.",
      }));
      isValid = false;
    }

    if (formData.password !== formData.rePassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rePassword: "Passwords do not match.",
      }));
      isValid = false;
    }

    if (isValid) {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      axios
        .post("http://localhost:3000/api/v1/register", registrationData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      Swal.fire("Thành Công", "Bạn đã đăng ký thành công", "success");
      navigate("/login");
    }
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
                Sign up your account
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Your Name"
                id="formControlLg"
                type="text"
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p style={{ color: "red" }} className="error-message">
                  {errors.name}
                </p>
              )}
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
              {errors.email && (
                <p style={{ color: "red" }} className="error-message">
                  {errors.email}
                </p>
              )}
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
              {errors.password && (
                <p style={{ color: "red" }} className="error-message">
                  {errors.password}
                </p>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Retype password"
                id="formControlLg"
                type="password"
                size="lg"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
              />
              {errors.rePassword && (
                <p style={{ color: "red" }} className="error-message">
                  {errors.rePassword}
                </p>
              )}
              {errorMessage && (
                <p style={{ color: "red" }} className="error-message">
                  {errorMessage}
                </p>
              )}
              <MDBBtn
                onClick={handleSubmit}
                className="mb-4 px-5"
                color="dark"
                size="lg"
              >
                Register
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Your have an account?
                <Link to="/login" style={{ color: "#393f81" }}>
                  Login here
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a className="small text-muted me-1">Terms of use.</a>
                <a className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default RegisterPage;
