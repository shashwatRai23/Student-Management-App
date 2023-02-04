import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AddUpdate from "./Pages/AddUpdate/AddUpdate";
import Home from "./Pages/Home/Home";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <ToastContainer position="top-center"/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddUpdate />}></Route>
          <Route path="/update/:id" element={<AddUpdate />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
