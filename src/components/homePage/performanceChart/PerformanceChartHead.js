import React, { useCallback, useEffect, useState } from "react";
import { IDENTITY_TOKEN } from "../../../utils/Wrapper";
import Dropdown from "./Dropdown";
import { useTheme } from "../../../config/themeProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PerformanceChartHead = ({ accumulateSelectedOptions, selectedMatrices }) => {
  const [allOptions, setOptionsAllOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const token = sessionStorage.getItem("token");
  const { darkMode } = useTheme();

  // fetch Options for the dropdown menu
  const fetchMetricsList = useCallback(() => {
    fetch(
      "https://coreapi.hectorai.live/api/day-parting/DayPartingFilterList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-USER-IDENTITY": IDENTITY_TOKEN,
          type: "text",
        },
        body: JSON.stringify({
          type: "customizeMetrics",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOptionsAllOptions(data.result);
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error('Failed to fetch Metrics Options, Try after some time!');
        setTimeout(() => {
          console.error("Error:", error)
        }, 3000)
      });
  }, [token]);

  const handleSelectedOptions = (allOptions) => {
    setSelectedOptions(allOptions)
  }

  useEffect(() => {
    fetchMetricsList();
  }, [fetchMetricsList]);

  useEffect(() => {
    if(selectedOptions.length > 0) accumulateSelectedOptions(selectedOptions)
  }, [accumulateSelectedOptions, selectedOptions])

  if (allOptions.length === 0) {
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
        <Dropdown allOptions={allOptions} handleSelectedOptions={handleSelectedOptions} selectedMatrices={selectedMatrices} />
      </div>
    </>
  );
};

export default PerformanceChartHead;
