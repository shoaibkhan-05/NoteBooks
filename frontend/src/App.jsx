import Home from "./assets/home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {  ToastContainer } from 'react-toastify';
import Navbar from "./assets/Navbar";
import About from "./assets/About";
import NoteState from "./assets/context/notes/NoteState.jsx";
import Login from "./assets/Login.jsx";
import SignUp from "./assets/Signup.jsx";
import { Bounce } from "react-toastify";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
           <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </Router>
      </NoteState>
     
      
    </>
  );
}

export default App;
