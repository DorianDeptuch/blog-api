import React, { useState, useEffect } from "react";
import Newpost from "./Newpost";
import PublishQueue from "./PublishQueue";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function AdminPage() {
  const [siteContents, setSiteContents] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showPublishQueue, setShowPublishQueue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  // const [admin, setAdmin] = useState("");

  useEffect(() => {
    fetch("/admin")
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((items) => {
        for (const post of items.post_list) {
          setSiteContents((prev) => [...prev, post]);
        }
        // setAdmin(items.authorData.author);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.error(err);
      });

    fetch("/admin")
      .then((res) => res.json())
      .then((res) => setCurrentUser(res.user.user.author))
      .catch((err) => console.log(err));
  }, []);

  function handleShowNewPost() {
    setShowNewPost((state) => !state);
  }

  function handleShowPublishQueue() {
    setShowPublishQueue((state) => !state);
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <img
        className="img-fluid"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%)" }}
        src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="banner img"
      ></img>
      {currentUser ? (
        <div className="container mb-5" style={{ marginTop: "-10rem" }}>
          <div className="pt-6 card rounded shadow bg-light">
            <h2 className="card-text mt-5">
              Welcome to the Admin Panel, {currentUser}
            </h2>
            <div style={{ margin: "2rem 0" }}>
              <button
                style={{ margin: "0 1rem" }}
                onClick={handleShowNewPost}
                className="btn btn-primary"
              >
                Create a Post
              </button>
              <button
                style={{ margin: "0 1rem" }}
                onClick={handleShowPublishQueue}
                className="btn btn-primary"
              >
                Posts to be Published
              </button>
            </div>
            {showNewPost ? <Newpost setShowNewPost={setShowNewPost} /> : ""}
            {showPublishQueue ? (
              <PublishQueue setShowPublishQueue={setShowPublishQueue} />
            ) : (
              ""
            )}
          </div>
          <section className="row d-flex justify-content-center">
            <h1 className="text-center py-5">Recent Blog Posts</h1>
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
                <div
                  key={i}
                  className="card col-lg col-md col-sm-4 m-3 p-0 shadow-lg"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt="Card img"
                  ></img>
                  <div className="card-body">
                    <h3 className="card-text">{post.title}</h3>
                    <a href={`/posts/${post._id}`}>
                      <button className="btn btn-primary">Read More >></button>
                    </a>
                  </div>
                </div>
              );
            })}
            <div className="py-2">
              <Link className="text-center py-2 mb-5" to="/posts">
                See all posts >>
              </Link>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <h1>Forbidden</h1>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
