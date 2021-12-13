import React, { useState, useRef } from "react";
// import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseButton } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

function Newpost() {
  // const textarea = document.getElementById("inputPostContent");
  // textarea.setAttribute("name", "inputPostContent");

  function handleEditorChange(e) {
    console.log("Content was updated:", e.target.getContent());
  }
  // console.log(process.env.REACT_APP_TINYMCE_API_KEY);
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
          {/* <textarea
            className="form-control"
            name="inputPostContent"
            id="inputPostContent"
          ></textarea> */}
          <Editor
            textareaName="inputPostContent"
            id="inputPostContent"
            initialValue="<p>Type here...</p>"
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
          />
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
