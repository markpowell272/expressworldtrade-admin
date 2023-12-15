import React from "react";
import "../css/General.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const Notfound = () => {
  return (
    <>
      <Helmet>
        <title>ET-Options | 404 - Not Found</title>
      </Helmet>
      <Navbar />
      <div className="general-container">
        <div className="body">
          <h5 style={{ textAlign: "center" }}>
            {" "}
            Uh Oooh..Lost your way?...
            <Link to="/dashboard">Go To Dashboard</Link>{" "}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Notfound;
