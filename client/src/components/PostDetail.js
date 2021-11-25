import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

function PostDetail() {
  const params = useParams();
  const [siteContents, setSiteContents] = useState([]);
  const [siteComments, setSiteComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { author, title, date, content, image } = siteContents;

  function convertTime(ISO8601) {
    let date = new Date(ISO8601);
    return date.toDateString();
  }

  useEffect(() => {
    fetch(params.postid)
      .then((res) => res.json())
      .then((item) => {
        const { results, comments } = item;
        setSiteContents(results);
        setSiteComments(comments);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-5" style={{ marginTop: "7rem" }}>
      <div className="card shadow rounded">
        {isLoading && (
          <div
            style={{
              marginTop: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        )}
        <img src={image} className="img-fluid card-img-top" alt="post detail" />
        <div className="card-body mb-5 mx-5">
          <h1 className="text-center card-title" style={{ marginTop: "7rem" }}>
            {title}
          </h1>
          <div className="card-subtitle text-muted mb-5">
            <h6 className="text-center">
              By <strong>{author}</strong> on {convertTime(date)}
            </h6>
          </div>
          <h3 className="text-center card-content">{content}</h3>
        </div>
        <div className="card-body mt-5">
          <form
            className="row g-3 border border-2 rounded p-5 m-5 shadow"
            action=""
            method="POST"
          >
            <h1 className="text-center">Add Comment</h1>
            <div className="mb-3">
              <label htmlFor="comment_user" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="comment_user"
                id="comment_user"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment_content" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                name="comment_content"
                id="comment_content"
                rows="3"
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="card py-5">
          <h1 className="text-center mt-5">Comments</h1>
          {siteComments.length ? (
            siteComments.map((comment, i) => {
              return (
                <div key={i} className="card mx-5 my-2 p-3 shadow">
                  <h6 className="card-title text-muted">
                    By <strong>{comment.username}</strong> on{" "}
                    {convertTime(comment.date)}
                  </h6>
                  <p className="card-text">{comment.message}</p>
                </div>
              );
            })
          ) : (
            <h6 className="text-center text-muted">
              There are no comments to display.
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
