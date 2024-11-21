import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import logo from "../../../assests/TechSavvyLogo.png"
import { useTheme } from "../../../config/themeProvider";
import '../../../App.css'

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 cursor-pointer border-r-[2px]
        ${isHovered ? "w-64" : "w-14"}
        ${darkMode ? "bg-gray-800 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900  border-gray-300"}`
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
          <span className="text-xl font-semibold fade-in">TECHSAVVY</span>
        )}
      </div>

      {/* Divider */}
      <hr className={`${darkMode ? 'border-gray-600' : 'border-gray-300'} border-[1px]`} />

      {/* Dashboard Icon */}
      <div className="flex items-center px-4 py-4 space-x-2 justify-center">
        <div className={`flex flex-row ${isHovered ? 'px-4 py-4' : 'px-3 py-3'} space-x-2 w-60 rounded-md justify-start
          ${darkMode ? 'bg-blue-900 text-white' : 'bg-blue-300 text-black'}`}
        >
          <HomeIcon className="w-6 h-6" />
          {isHovered && <span className="text-base font-semibold">Dashboard</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
