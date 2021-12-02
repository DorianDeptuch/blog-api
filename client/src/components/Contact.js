import React from "react";

function Contact() {
  return (
    <div className="container mb-5" style={{ marginTop: "7rem" }}>
      <div className="card rounded shadow p-5 bg-light">
        <h1 className="card-title text-center mt-5">Contact</h1>
        <div className="card-body">
          <ul style={{ listStyle: "none" }}>
            <li className="text-center">
              <a className="nav-link" href="https://github.com/DorianDeptuch">
                {" "}
                GitHub <i className="bi bi-github"></i>
              </a>
            </li>
            <li className="text-center">
              <a
                className="nav-link"
                href="https://linkedin.com/in/doriandeptuch"
              >
                Linkedin <i className="bi bi-linkedin"></i>
              </a>
            </li>
            <li className="text-center">
              <a className="nav-link" href="mailto:dorian.deptuch@gmail.com">
                Email Me <i className="bi bi-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
