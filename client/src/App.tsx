import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ShoppingPage from "./pages/ShoppingPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckOutLayout from "./components/CheckOutLayout";
import CheckoutPage from "./pages/CheckoutPage";
import BillPage from "./pages/BillPage";
import AdminLogin from "./admin/AdminLogin";
import AdminPage from "./admin/AdminPage";
import AdminHome from "./admin/AdminHome";
import AdminProduct from "./admin/AdminProduct";
import ProductAddNew from "./admin/ProductAddNew";
import AdminProductDetail from "./admin/AdminProductDetail";
import AdminOrder from "./admin/AdminOrder";
import AdminUser from "./admin/AdminUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shopping" element={<ShoppingPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckOutLayout />}>
        <Route path="step-1" element={<CheckoutPage />} />
        <Route path="step-2" element={<BillPage />} />
      </Route>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<AdminHome></AdminHome>} />

        <Route path="home" element={<AdminHome />} />
        <Route path="products">
          <Route index element={<AdminProduct />} />
          <Route path="add" element={<ProductAddNew />} />
          <Route path="edit/:id" element={<AdminProductDetail />} />
        </Route>
        <Route path="orders" element={<AdminOrder />} />
        <Route path="users" element={<AdminUser />} />
      </Route>
    </Routes>
  );
}

export default App;
