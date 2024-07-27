import React from "react";
import Hamburger from "./Hamburger";

import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = React.useState(false);
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar);
    };
  
    return (
      <nav className="navbar">
        <div className="container">
          
          <div className="logo">
            <Logo />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <Hamburger />
          </div>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/form">Apply Reservation</NavLink>
              </li>
              <li>
                <NavLink to="/projects">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;