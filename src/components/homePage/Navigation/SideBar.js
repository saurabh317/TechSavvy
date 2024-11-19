import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import logo from "../../../assests/TechSavvyLogo.png"
import { useTheme } from "../../../config/themeProvider";

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 cursor-pointer 
        ${isHovered ? "w-64" : "w-14"} 
        ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      {/* Company Icon */}
      <div className={`flex items-center h-[55px] gap-1 ${isHovered ? "px-5" : 'px-2'}`}>
        <img
          src={logo}
          alt="Company Logo"
          className="w-10 h-10"
        />
        {isHovered && (
          <span className="text-xl font-semibold">TECHSAVVY</span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-gray-700" />

      {/* Dashboard Icon */}
      <div className="flex items-center px-4 py-4 space-x-2 justify-center">
        {!isHovered && <HomeIcon className="w-6 h-6" />}
        {isHovered && (
          <div className={`flex flex-row px-4 py-4 space-x-2 w-60 rounded-md justify-start
            ${darkMode ? 'bg-blue-900 text-white' : 'bg-blue-300 text-black'}`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-base font-semibold">Dashboard</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
