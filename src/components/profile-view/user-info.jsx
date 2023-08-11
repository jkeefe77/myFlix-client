import React from "react";

export const UserInfo = ({ user }) => {
  return (
    <div
      className="contact-form-container"
      style={{ backgroundColor: "#1D2F40" }}
    >
      <div className="user-info-container">
        <div className="user-info-details">
          <h2 className="mydetails">Welcome Back!</h2>
          <table className="userdetails">
            <tbody>
              <tr>
                <td className="fw-bold">Username:</td>
                <td>{user.Username}</td>
              </tr>
              <tr>
                <td className="fw-bold">Email:</td>
                <td>{user.Email}</td>
              </tr>
              <tr>
                <td className="fw-bold">Birthdate:</td>
                <td>{user.Birthday.slice(0, 10)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
