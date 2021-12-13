import { React, useEffect, useState } from "react";
import { Carousel, CloseButton } from "react-bootstrap";

function PublishQueue() {
  const [siteContents, setSiteContents] = useState([]);

  useEffect(() => {
    fetch("/api")
      //   fetch("/api", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   })
      .then((res) => res.json())
      .then((posts) => {
        for (const post of posts.post_list) {
          setSiteContents((prev) => [...prev, post]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div
      className="card shadow rounded p-5"
      style={{ margin: "5rem 10rem 10rem 10rem", position: "relative" }}
    >
      <CloseButton
        // onClick={setShowPublishQueue(false)}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      <Carousel>
        <h1 className="text-center">Posts to be Published:</h1>
        {siteContents.map((post, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={post.image}
                alt="Post main cover"
              />
              <Carousel.Caption>
                <h3 style={{ textShadow: "2px 2px black" }}>{post.title}</h3>
                <div className="d-flex justify-content-center">
                  <a href={"/posts/" + post._id}>
                    <button className="btn btn-success rounded mx-1 shadow">
                      Read
                    </button>
                  </a>
                  <button className="btn btn-primary rounded mx-1 shadow">
                    Publish
                  </button>
                  <button className="btn btn-danger rounded mx-1 shadow">
                    Delete
                  </button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default PublishQueue;
