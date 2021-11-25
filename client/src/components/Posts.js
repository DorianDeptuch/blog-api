import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function Posts() {
  const [siteContents, setSiteContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function convertTime(ISO8601) {
    let date = new Date(ISO8601);
    return date.toDateString();
  }

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((posts) => {
        for (const post of posts.post_list) {
          setSiteContents((prev) => [...prev, post]);
        }
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <section className="d-flex flex-column justify-content-center">
        <h1 className="text-center py-2">Posts</h1>
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
        {siteContents.map((post, i) => {
          return (
            <div key={i} className="card d-flex flex-row row m-3 p-0 shadow-lg">
              <img
                src={post.image}
                className="card-img-left col-4 px-0"
                alt="Card img"
              />
              <div className="card-body col-8" style={{ position: "relative" }}>
                <h3 className="card-text">{post.title}</h3>
                <div className="card-subtitle text-muted">
                  <h6>
                    By <strong>{post.author}</strong> on{" "}
                    {convertTime(post.date)}
                  </h6>
                </div>
                <a
                  href={`/posts/${post._id}`}
                  style={{ position: "absolute", bottom: "10%" }}
                >
                  <button className="btn btn-primary">Read More</button>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Posts;
