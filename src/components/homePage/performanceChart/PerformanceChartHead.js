import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useTheme } from "../../../config/themeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../../../utils/customHooks";
import { POST_REQUEST } from "../../../utils/constant";

const PerformanceChartHead = ({ accumulateSelectedOptions, selectedMatrices }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const API = "https://coreapi.hectorai.live/api/day-parting/DayPartingFilterList";
  const body = JSON.stringify({ type: "customizeMetrics" });
  const { darkMode } = useTheme();

  const [allOptions, loading] = useApi(API, POST_REQUEST, body)

  const handleSelectedOptions = (allOptions) => {
    setSelectedOptions(allOptions)
  }

  useEffect(() => {
    if(selectedOptions.length > 0) accumulateSelectedOptions(selectedOptions)
  }, [accumulateSelectedOptions, selectedOptions])

  if (loading) {
    return
  }

  return (
    <>
      {/* Right Side Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme={!darkMode ? "light" : "dark"}
      />
      <div className={`flex justify-between items-baseline sm:items-center p-2 rounded-lg
        ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'}`}
      >
        {/* Left Side Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Performance Chart</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Key Metrics for Dayparting Schedule Performance Evaluation
          </p>
        </div>

        {/* Right Side Dropdown */}
        <Dropdown allOptions={allOptions.result || []} handleSelectedOptions={handleSelectedOptions} selectedMatrices={selectedMatrices} />
      </div>
    </>
  );
};

export default PerformanceChartHead;
