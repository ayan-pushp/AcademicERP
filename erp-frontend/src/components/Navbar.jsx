import React from "react";

const Navbar = ({ username, handleLogout }) => {
  const employeePhoto = localStorage.getItem("pic");

  return (
    <nav className="navbar">
      <div className="navbar">
        {employeePhoto ? (
          <img src={employeePhoto} alt="Employee" className="employee-photo" />
        ) : (
          <span>Loading...</span>
        )}
        <span>Hello {username}!</span>
      </div>
      <div className="navbar">
        <h1>Placement Management Portal</h1>
      </div>
      <div className="navbar">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
