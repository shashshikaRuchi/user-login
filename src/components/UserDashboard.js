import React, { useState, useEffect } from "react";
import { tableArray } from "./TableConstant";
import NasaData from "./NasaData";
import { Edit, Delete } from "@mui/icons-material";
import "./UserDashboard.css";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  const currentLoginUserData = location.state?.decodedToken;
  const { name, email } = currentLoginUserData;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const findEmail = tableArray.find((item) => item?.email === email);
    if (!findEmail) {
      tableArray.push({
        name,
        email,
        role: "Admin",
        type: "Full-time",
        status: "Active",
        id: tableArray.length + 1,
      });
    }
    setData(tableArray);
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleToggleStatus = (id) => {
    setData(
      data.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <h3>{name}</h3>
        <div className="search-input">
          Search:{" "}
          <input
            style={{ height: "30px" }}
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.type}</td>
              <td>
                <span
                  style={{
                    cursor: "pointer",
                    color: row.status === "Active" ? "green" : "red",
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td>
                <span
                  className="action-icon"
                  style={{
                    backgroundColor: "lightgrey",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <Edit
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleToggleStatus(row.id)}
                  />
                </span>
                <span
                  className="action-icon"
                  style={{
                    backgroundColor: "lightgrey",
                    display: "inline-block",
                  }}
                >
                  <Delete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(row.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NasaData />
    </div>
  );
};

export default UserDashboard;
