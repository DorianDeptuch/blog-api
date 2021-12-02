import React from "react";

function About() {
  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <div className="card rounded shadow p-5 bg-light">
        <h1 className="card-title text-center">About</h1>
        <div className="card-body">
          <h3>This project was made using Node, Express, ejs, Bootstrap</h3>
        </div>
      </div>
    </div>
  );
}

export default About;
