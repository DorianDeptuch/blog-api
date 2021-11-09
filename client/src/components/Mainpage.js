import React from "react";
import Newpost from "./Newpost";
import PublishQueue from "./PublishQueue";
import Header from "./Header";
import Footer from "./Footer";

function Mainpage() {
  return (
    <div>
      <Header />
      <Newpost />
      <PublishQueue />
      <Footer />
    </div>
  );
}

export default Mainpage;
