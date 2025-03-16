

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersAuth from "./Component/UsersAuth";
import JobListings from "./Component/JobListings";
import Navbar from "./Component/Navbar";
import RecruiterManage from "./Component/RecruiterManage";

const App = () => {
  return (
    <Router> 
      <Navbar /> 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", 
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Routes> 
          <Route path="/joblistings" element={<JobListings/>} />
          <Route path="/recruitermanage" element={<RecruiterManage/>} />
          <Route exact path="/" element={<UsersAuth/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


