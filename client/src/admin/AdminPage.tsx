import React from "react";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { Chart, initTE } from "tw-elements";

initTE({ Chart });

const AdminPage: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-haianh">
        <Outlet />
      </div>
    </>
  );
};

export default AdminPage;
