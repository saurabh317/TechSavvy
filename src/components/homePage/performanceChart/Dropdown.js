import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTheme } from "../../../config/themeProvider";

const Dropdown = ({ allOptions, handleSelectedOptions, selectedMatrices }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const rect = document.body.getBoundingClientRect()
  const { darkMode } = useTheme();
  const lastOption = allOptions.findIndex((e) => e.code === selectedOptions[0])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((item) => {
          if(selectedOptions.length > 1) {
            return item !== option
          }
          return prevSelectedOptions
        })
        : [...prevSelectedOptions, option]
    );
  };

  const handleCancel = () => {
    setSelectedOptions(selectedMatrices)
    setIsOpen(false);
  };

  const handleApply = () => {
    handleSelectedOptions(selectedOptions)
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOptions(selectedMatrices)
  }, [selectedMatrices])

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`px-4 py-2 rounded-md ${rect.width > 768 ? "w-32" : ''}
          ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} z-[1000]`
        }
      >
        {rect.width > 768 && 'Metrics'}
        {!isOpen && <ArrowDropDownIcon/>}
        {isOpen && <ArrowDropUpIcon/>}
      </button>
      {isOpen && (
        <div className={`flex flex-col justify-center absolute mt-2 w-48 right-[-5px] p-2 rounded-md
          ${darkMode ? 'bg-gray-800 border-white text-white shadow-md' : 'bg-white border-gray-300 text-black shadow-lg'}`}
        >
          {allOptions.map((option, i) => (
            <div key={option.code} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={option.code}
                name={option.code}
                disabled={i === lastOption && selectedOptions.length === 1}
                checked={selectedOptions.includes(option.code)}
                onChange={() => handleCheckboxChange(option.code)}
                className="mr-2"
              />
              <label htmlFor={option.code} className="capitalize">
                {option.label}
              </label>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCancel}
              className={`px-3.5 py-1.5 border rounded-md 
                ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-black'}`}>
              Cancel
            </button>
            <button
              onClick={handleApply}
              className={`px-3.5 py-1.5 rounded-md 
                ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
