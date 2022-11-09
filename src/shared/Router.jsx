import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Add from "../pages/Add";
import Dump from "../pages/Dump";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/dump' element={<Dump />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
