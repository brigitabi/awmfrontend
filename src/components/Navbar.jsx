import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { ImStatsBars } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";

export default function Navbar() {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

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
            <p className="mr-2 rounded-full bg-transparent p-1 cursor-pointer">
              <Logo className="fill-green-500 text-2xl" />
            </p>
            Agree With Me
          </NavLink>

          <div className="relative">
            <div className="flex space-x-3">
              <NavLink to="/statistics">
                <ImStatsBars id="menu" className="cursor-pointer" size={25} />
              </NavLink>

              <div
                onMouseEnter={() => setShowMessage(true)}
                onMouseLeave={() => setShowMessage(false)}
              >
                <AiOutlineMessage
                  id="menu"
                  className="cursor-pointer"
                  size={25}
                />
              </div>

              {showMessage && (
                <div className="absolute top-10 -right-2 text-green-600 text-xs shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-green-500 p-2 rounded-lg">
                  <p>Coming Soon</p>
                </div>
              )}
            </div>

            {/* options menu */}
            {showMenu && (
              <div className="absolute top-full -right-10 mt-4  bg-[#321664] text-white shadow-md p-2 rounded-lg">
                <button
                  className="block w-full text-left py-2 px-4 text-white hover:bg-violet-900 hover:rounded-lg text-sm"
                  onClick={() => displayOptions("statistics")}
                >
                  Statistics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
