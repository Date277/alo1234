import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

const AdminUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    axios
      .get<User[]>(`http://localhost:3000/api/v1/user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Customer Management</h1>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr className="table-primary text-center">
            <th>STT</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>pass</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr className=" text-center" key={user.user_id}>
              <th scope="row">{i + 1}</th>
              <td>000324{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <span className="badge badge-success rounded-pill d-inline">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
