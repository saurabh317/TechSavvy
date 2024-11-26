import React from "react";
import { CircularProgress } from "@mui/material";
import HeatMapTableHead from "./HeatMapTableHead";
import { useTheme } from "../../../config/themeProvider";
import { getColor, POST_REQUEST } from "../../../utils/constant";
import { useApi } from "../../../utils/customHooks";

// Heatmap table component
const HeatMapTable = ({ startDate, endDate }) => {
  const API = "https://coreapi.hectorai.live/api/day-parting/heatmap-list";
  const { darkMode } = useTheme();

  const body = JSON.stringify({
    startDate: startDate || "2024-11-12",
    endDate: endDate || "2024-11-19",
    metrics: ["Impressions", "Clicks", "CPM"],
  })

  const timeFrames = [
    "12am", "1am", "2am", "3am", "4am",
    "5am", "6am", "7am", "8am", "9am",
    "10am", "11am", "12pm", "1pm", "2pm",
    "3pm", "4pm", "5pm", "6pm", "7pm",
    "8pm", "9pm", "10pm", "11pm"
  ];

  const [res, loading] = useApi(API, POST_REQUEST, body)
  const data = res?.result || []

  // Initialize totals for each column
  const totalImpressions = new Array(data.length).fill(0);
  const totalClicks = new Array(data.length).fill(0);
  const totalCPM = new Array(data.length).fill(0);

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <CircularProgress style={{ color: "grey" }} />
      </div>
    );
  }

  return (
    <>
      <HeatMapTableHead />
      <div
        className={`overflow-x-auto p-3 w-full text-[10px]
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`
        }
      >
        <table
          className={`w-full border-collapse table-auto text-[10px]
            ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
          <thead>
            <tr>
              <th
                className={`border p-1 text-left ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}>
                Time
              </th>
              {data.map((day, idx) => (
                <th
                  key={idx}
                  className={`border p-2 text-center text-[10px] ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                  colSpan="3">
                  {day.weekday}
                </th>
              ))}
            </tr>
            <tr>
              <th
                className={`border p-1 text-left text-[10px] ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              ></th>
              {data.map((day, idx) => (
                <React.Fragment key={idx}>
                  <th
                    className={`border p-1 text-center text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    Imp
                  </th>
                  <th
                    className={`border p-1 text-center text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    Clicks
                  </th>
                  <th
                    className={`border p-1 text-center text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    CPM
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeFrames.map((time, timeIdx) => {
              return (
                <tr key={timeIdx}>
                  <td
                    className={`border p-1 text-left text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {time}
                  </td>
                  {data.map((day, dayIdx) => {
                    const hourlyData = day.Hourly_Data[timeIdx];

                    // Update totals
                    totalImpressions[dayIdx] += hourlyData.Impressions;
                    totalClicks[dayIdx] += hourlyData.Clicks;
                    totalCPM[dayIdx] += hourlyData.CPM;

                    return (
                      <React.Fragment key={dayIdx}>
                        {/* Imp */}
                        <td
                          className={`border p-1 text-center text-[10px] text-black`}
                          style={{
                            backgroundColor: getColor(
                              hourlyData.Impressions,
                              day.min_Impressions,
                              day.max_Impressions,
                              "Imp"
                            ),
                          }}>
                          {hourlyData.Impressions.toFixed(2)}
                        </td>

                        {/* Clicks */}
                        <td
                          className={`border p-1 text-center text-[10px] text-black`}
                          style={{
                            backgroundColor: getColor(
                              hourlyData.Clicks,
                              day.min_Clicks,
                              day.max_Clicks,
                              "Clicks"
                            ),
                          }}>
                          {hourlyData.Clicks.toFixed(2)}
                        </td>

                        {/* CPM */}
                        <td
                          className={`border p-1 text-center text-[10px] text-black`}
                          style={{
                            backgroundColor: getColor(
                              hourlyData.CPM,
                              day.min_CPM,
                              day.max_CPM,
                              "CPM",
                            ),
                          }}>
                          {hourlyData.CPM.toFixed(2)}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}

            {/* Row for totals */}
            <tr>
              <td
                className={`border p-1 text-left font-bold text-[10px] ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}>
                Total
              </td>
              {data.map((_, dayIdx) => (
                <React.Fragment key={dayIdx}>
                  <td
                    className={`border p-1 text-center font-bold text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    {totalImpressions[dayIdx].toFixed(2)}
                  </td>
                  <td
                    className={`border p-1 text-center font-bold text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    {totalClicks[dayIdx].toFixed(2)}
                  </td>
                  <td
                    className={`border p-1 text-center font-bold text-[10px] ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}>
                    Rs.{totalCPM[dayIdx].toFixed(2)}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HeatMapTable;
