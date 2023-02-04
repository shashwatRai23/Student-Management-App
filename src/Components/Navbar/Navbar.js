import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.jpg";
import { BsPeople } from "react-icons/bs";
import { BsFillMenuAppFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setActiveTab("Home");
    else if (location.pathname === "/add") setActiveTab("Add");
  }, [location.pathname]);

  return (
    <nav className="nav">
      <div>
        <img src={logo} alt="logo"/>
      </div>
      <div className="nav_links">
        <Link
          to="/add"
          className={activeTab === "Add" ? "nav_link active" : "nav_link"}
          onClick={() => setActiveTab("Add")}
        >
          <BsPeople className="nav_icons" />
          Add Students
        </Link>
        <Link
          to="/"
          className={activeTab === "Home" ? "nav_link active" : "nav_link"}
          onClick={() => setActiveTab("Home")}
        >
          <BsFillMenuAppFill className="nav_icons" />
          Manage Students
        </Link>
        <Link to="/" className="nav_link">
          <RxExit className="nav_icons" />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
