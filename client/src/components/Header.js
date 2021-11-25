import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="mb-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Nature Blog
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mx-auto">
                <NavLink className="nav-link" to="/posts">
                  Blog
                </NavLink>
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </div>
              <div className="navbar-nav mx-auto">
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Log Out
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
