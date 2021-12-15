// import logo from "./logo.svg";
import "./App.css";
import AdminPage from "./components/AdminPage";
import MainPage from "./components/MainPage";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App ">
      <Header />
      <Routes>
        {/* <Mainpage /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postid" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<MainPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
