import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <>
      <div
        className={
          "relative z-50 flex h-16 items-center justify-between bg-[#262165] px-4 shadow-lg"
        }>
        <NavLink
          to="/"
          className="brand mr-4 flex items-center text-xl text-white"
        >
          <div className="mr-2 rounded-full bg-transparent p-1">
            <Logo className="fill-green-500 text-2xl" />
          </div>
          Agree With Me
        </NavLink>
      </div>
    </>
  );
}
