import React, { useState, useEffect, useRef } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/outline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTheme } from "../../../config/themeProvider";
import DatePickerWithValidation from "./DatePickerWithValidation ";

const AccountInfo = ({ SetIsLoggedIn }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`absolute right-[-10px] w-56 p-4 mt-5 rounded-lg shadow-md z-10
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`
      }
    >
      <div className="flex gap-4  items-center h-10">
        <div className={`flex justify-center items-center rounded-[50%] w-10 h-full
          ${darkMode ? 'bg-blue-900 text-gray-200' : 'bg-blue-800 text-white'}`}
        >
          N
        </div>
        <div className="flex flex-col">
          <span className="text-lg">Naveen</span>
          <span className="text-sm">Online</span>
        </div>
      </div>
      <div className="flex px-2 mt-4">
        <button
          className={`w-full px-4 py-2 mt-4 text-md rounded 
            ${darkMode ? 'text-gray-200 bg-red-700 hover:bg-red-800' : 'text-white bg-red-500 hover:bg-red-600'}`
          }
          onClick={() => {
            sessionStorage.clear();
            SetIsLoggedIn(false);
          }}>
          <LogoutIcon /> &nbsp; Logout
        </button>
      </div>
    </div>
  );
};

const Header = ({ SetIsLoggedIn, startDate, setStartDate, endDate, setEndDate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const rect = document.body.getBoundingClientRect()
  const { toggleTheme, darkMode } = useTheme();

  // Function to toggle dark/light theme
  const changeTheme = () => {
    toggleTheme()
    setIsDarkMode(!isDarkMode)
  }

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`flex items-center justify-between w-auto ${rect.width > 850 ? 'px-6 py-1' : 'px-2 py-4'} shadow-md
        ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      {/* Left Side - Dashboard Title */}
      <h1
        className={`text-2xl font-bold ${rect.width > 850 ? "ml-9" : ''}
          ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
        Dashboard
      </h1>

      <div className="flex sm:gap-8">
        <DatePickerWithValidation
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        {/* Right Side - Theme Toggle, User Icon, and Dropdown Icon */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Icon */}
          <button
            onClick={changeTheme}
            className={`p-2 rounded-full
              ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            {isDarkMode ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>

          {/* User Icon and Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center pointer">
              <button
                onClick={toggleDropdown}
                className={`rounded-full
                  ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                <UserIcon className="w-6 h-6" />
              </button>
              <button onClick={toggleDropdown}>
                {!isDropdownOpen && <ArrowDropDownIcon style={{color: `${darkMode ? "white" : "black"}`}} />}
                {isDropdownOpen && <ArrowDropUpIcon style={{color: `${darkMode ? "white" : "black"}`}} />}
              </button>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && <AccountInfo SetIsLoggedIn={SetIsLoggedIn} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
