// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.scss";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Menu from "./Menu/Menu";
import HomePage from "./Home Page/HomePage";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import AboutPage from "./AboutPage/AboutPage";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <Router className="App">
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
