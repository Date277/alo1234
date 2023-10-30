import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Province {
  name: string;
  districts: District[];
}

interface District {
  name: string;
  wards: Ward[];
}

interface Ward {
  name: string;
}

const CheckoutPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState<Province[]>([]); // Tỉnh/Thành Phố
  const [activeProvince, setActiveProvince] = useState<string>("");

  const [districts, setDistricts] = useState<District[]>([]); // Quận/Huyện
  const [activeDistrict, setActiveDistrict] = useState<string>("");

  const [wards, setWards] = useState<Ward[]>([]); // Phường/Xã
  const [activeWard, setActiveWard] = useState<string>("");

  const VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";
  const BASE_API = "http://localhost:3000/api/v1";

  const fetchProvinces = async () => {
    try {
      const res = await fetch(VIETNAM_BASE_API);
      const data: Province[] = await res.json();
      setProvinces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    const clickProvince = provinces.find((e) => e.name === activeProvince);
    if (clickProvince) {
      setDistricts(clickProvince.districts);
      setActiveWard("");
    }
  }, [activeProvince, provinces]);

  useEffect(() => {
    const clickDistrict = districts.find((e) => e.name === activeDistrict);
    if (clickDistrict) {
      setWards(clickDistrict.wards);
    }
  }, [activeDistrict, districts]);

  const handleActiveProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
    }
  };

  const handleActiveDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường thông tin trước khi gửi đơn hàng
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !activeProvince ||
      !activeDistrict ||
      !activeWard
    ) {
      Swal.fire("Thất Bại", "Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    // Kiểm tra định dạng email bằng biểu thức chính quy
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      Swal.fire("Thất Bại", "Email chưa đúng định dạng", "error");

      return;
    }

    // Kiểm tra định dạng số điện thoại bằng biểu thức chính quy
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      Swal.fire("Thất Bại", "Số điện thoại chưa đúng định dạng", "error");
      return;
    }

    try {
      const order = {
        name,
        user_id: userID,
        email,
        phone,
        address,
        province: activeProvince,
        district: activeDistrict,
        ward: activeWard,
      };

      const res = await fetch(BASE_API + "/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      localStorage.setItem("orderID", data.orderId);
      Swal.fire("Thành công", data.message, "success").then(() => {
        navigate(`/checkout/step-2`);
      });
    } catch (error) {
      console.log(error);
      alert("Có lỗi xảy ra khi gửi đơn hàng");
    }
  };

  return (
    <div className="col-7 left-side">
      <h3 className="title">HaiAnhShop</h3>
      <p className="sub-title">Thông tin giao hàng</p>
      <div className="remind">
        Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="address-container mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleActiveProvince}
            value={activeProvince}
          >
            <option selected value="">
              Tỉnh/Thành
            </option>
            {provinces.length > 0 &&
              provinces.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleActiveDistrict}
            value={activeDistrict}
          >
            <option selected value="">
              Quận/Huyện
            </option>
            {districts.length > 0 &&
              districts.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleActiveWard}
            value={activeWard}
          >
            <option selected value="">
              Phường/Xã
            </option>
            {wards.length > 0 &&
              wards.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>
        </div>

        <div className="form-footer mb-3">
          <Link className="back" to="/cart">
            Giỏ hàng
          </Link>
          <Link
            className="step btn btn-primary"
            onClick={handleCheckout}
            to={""}
          >
            Xác nhận đơn hàng
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
