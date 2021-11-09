import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div>
      <footer style={{ marginTop: "10rem" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
          <div className="container-fluid">
            <div className="navbar-nav">
              <p>Copyright &copy; 2021</p>
              <a className="nav-link" href="https://github.com/DorianDeptuch">
                <i className="bi bi-github"></i>
              </a>
              <a
                className="nav-link"
                href="https://linkedin.com/in/doriandeptuch"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
