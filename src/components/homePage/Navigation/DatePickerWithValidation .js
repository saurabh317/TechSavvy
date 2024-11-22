import React from "react";
import { DateRange } from "@mui/icons-material";
import { useTheme } from "../../../config/themeProvider";


const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const rect = document.body.getBoundingClientRect()
  const hide = rect.width > 850
  const { darkMode } = useTheme();

  const handleStartDateChange = (e) => {
    if (e.target.value !== "") {
      const selectedDate = new Date(e.target.value);
      setStartDate(e.target.value);

      // Calculate end date as start date + 7 days
      const calculatedEndDate = new Date(selectedDate);
      calculatedEndDate.setDate(selectedDate.getDate() + 7);
      setEndDate(calculatedEndDate.toISOString().split("T")[0]);
    }
  };

  // Helper to format dates for rendering (e.g., Jan 14 - Jan 20, '24)
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Format year to show only last two digits
  const formatYear = (date) => `${new Date(date).getFullYear().toString().slice(-2)}`;

  return (
    <div
      className={`flex items-center ${hide ? 'space-x-2 p-2' : ''}  rounded-lg shadow-md max-w-sm sm:max-w-md text-sm flex-col h-fit sm:h-auto sm:flex-row ${
        darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Icon */}
      {hide && <div className={`text-${darkMode ? "gray-400" : "gray-600"}`}>
        <DateRange fontSize="medium" />
      </div>}

      {/* Date Info */}
      {hide && <div className="flex flex-col flex-grow">
        <div className="font-medium">
          {hide && "Last 7 Days: "}
          <span className="font-semibold">
            {startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}, ${formatYear(
                  endDate
                )}`
              : `${formatDate('2024-11-12')} - ${formatDate('2024-11-19')}, ${formatYear(
                  '2024-11-12'
                )}`}
          </span>
        </div>
      </div>}

      {/* Date Picker */}
      <div>
        <input
          type="date"
          className={` mt-1 sm:mt-0 w-28 border rounded-md p-1 focus:outline-none focus:ring-2 ${
            darkMode
              ? "text-gray-200 border-gray-600 bg-gray-700 focus:ring-blue-400"
              : "text-gray-800 border-gray-300 bg-white focus:ring-blue-500"
          } cursor-pointer`}
          value={startDate || '2024-11-12'}
          onChange={handleStartDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;

