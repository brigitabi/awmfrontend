import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const displayOptions = (option) => {
    if (option === "profile") {
      navigate("/profile");
    } else if (option === "statistics") {
      navigate("/statistics");
    }
    setShowMenu(false);
  };

  return (
    <>
      <div
        className={
          "relative z-50 flex h-16 items-center justify-between bg-[#262165] px-4 shadow-lg"
        }
      >
        <div className="flex flex-row w-full justify-around">
          <NavLink
            to="/"
            className="brand mr-4 flex items-center text-xl text-white"
          >
            <p className="mr-2 rounded-full bg-transparent p-1">
              <Logo className="fill-green-500 text-2xl" />
            </p>
            Agree With Me
          </NavLink>

          <IoMenu
            className="cursor-pointer"
            onClick={handleMenuClick} 
          />

          {/* options menu */}
          {showMenu && (
            <div className="absolute top-full right-20  bg-[#321664] text-white shadow-md p-4 rounded-lg">
              <button
                className="block w-full text-left py-2 px-4 text-white hover:bg-green-800 hover:rounded-lg"
                onClick={() => displayOptions("profile")}
              >
                Profile
              </button>
              <button
                className="block w-full text-left py-2 px-4 text-white hover:bg-green-800 hover:rounded-lg"
                onClick={() => displayOptions("statistics")}
              >
                Statistics
              </button>
            </div>
          )}
         
        </div>
      </div>
    </>
  );
}
