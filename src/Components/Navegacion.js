import React from "react";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import { Orders } from "./Orders";
import { Error } from "./Error";
import { NewItem } from "./NewItem";
import "../App.css";

export const Navegacion = () => {
  return (
    <BrowserRouter>
      <div className="md:flex static">
        <div className="w-2/5 bg-slate-700 stiki top-0 z-50">
          <h1 className="p-6 text-white uppercase text-xl text-center">Navigation Bar</h1>
          <nav className="p-6">
            <ul>
              <li className="text-white text-center p-2 hover:bg-yellow-300 text">
                <NavLink to="/menu">Menu</NavLink>
              </li>
              
              <li className="text-white text-center p-2 hover:bg-yellow-300">
                <NavLink to="/newitem">NewItem</NavLink>
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
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
