import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div>
      <header className="mb-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Nature Blog
            </a>
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
                <a className="nav-link" href="/posts">
                  Blog
                </a>
                <a className="nav-link" href="/about">
                  About
                </a>
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </div>
              <div className="navbar-nav mx-auto">
                <a className="nav-link" href="/login">
                  Log In
                </a>
                <a className="nav-link" href="/logout">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
