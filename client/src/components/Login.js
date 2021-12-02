import React from "react";

function Login() {
  return (
    <div
      className="container card shadow rounded py-5"
      style={{ marginTop: "7rem" }}
    >
      <h1 className="text-center card-title">Log In</h1>
      <form className="row g-3 card-body" action="" method="POST">
        <div className="col-md-12">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="inputUsername"
            id="inputUsername"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="inputPassword"
            id="inputPassword"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
