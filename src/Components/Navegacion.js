import React from "react";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import { Orders } from "./Orders";
import { Error } from "./Error";
import { NewItem } from "./NewItem";

import "../App.css";
import Login from "./auth/Login";


export const Navegacion = () => {
  return (
    <BrowserRouter>
      <div className="md:flex static">
        <div className="w-2/5 bg-slate-700 stiki top-0 z-50">
         
          <img className="bg-white " src="/La.png" alt="Navigation Image" />
          <nav className="p-6">
            <ul>
              <li className="text-white text-center rounded-md p-2 hover:bg-yellow-300 text">
                <NavLink to="/menu">Menu</NavLink>
              </li>
              
              <li className="text-white text-center rounded-md  p-2 hover:bg-yellow-300">
                <NavLink to="/newitem">NewItem</NavLink>
              </li>
              <li className="text-white text-center rounded-md  p-2 hover:bg-yellow-300">
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes className="md:w-3-5">
            <Route path="/" element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/newitem" element={<NewItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
