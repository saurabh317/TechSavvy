import React from "react";
import { useTheme } from "../../../config/themeProvider";

const HeatMapTableHead = () => {
  const { darkMode } = useTheme();


  return (
    <div className="flex justify-between items-center p-2 rounded-lg">
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1">Heat Map</h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Select Hour to Schedule Dayparting
        </p>
      </div>
    </div>
  );
};

export default HeatMapTableHead;
