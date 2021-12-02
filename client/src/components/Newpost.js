import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseButton } from "react-bootstrap";

function Newpost() {
  return (
    <div
      className="card rounded shadow p-5"
      style={{ margin: "5rem 10rem 5rem 10rem" }}
    >
      <CloseButton
        // onClick={setShowNewPost(false)}
        style={{ position: "absolute", top: 0, right: 0, padding: "1rem" }}
      />

      <h1 className="text-center card-title">New Post</h1>
      <form className="row g-3 card-body" action="" method="POST">
        <div className="col-md-12">
          <label htmlFor="inputPostTitle" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            name="inputPostTitle"
            id="inputPostTitle"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPostImageURL" className="form-label">
            Post Image URL
          </label>
          <input
            type="text"
            className="form-control"
            name="inputPostImageURL"
            id="inputPostImageURL"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPostContent" className="form-label">
            Post Content
          </label>
          <textarea
            className="form-control"
            name="inputPostContent"
            id="inputPostContent"
          ></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newpost;
