import React, { useState } from "react";


const Navbar = () => {
  return (
    <div style={{
      width: "100%",
      background: "#2a5298",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      {/* <span>Username</span> */}
      <h1 style={{ margin: 0 }}>JOBSEEKER</h1>
      {/* <button style={{
        background: "white",
        color: "#2a5298",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer"
      }}>Logout</button> */}
    </div>
  );
};

export default Navbar
