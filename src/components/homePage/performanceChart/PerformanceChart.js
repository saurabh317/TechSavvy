import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale,
  Title, Tooltip, Legend, PointElement, LineElement,
} from "chart.js";
import { matricsColors } from "../../../utils/data";
import { CircularProgress } from "@mui/material";
import { IDENTITY_TOKEN } from "../../../utils/Wrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../../config/themeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ selectedMatrices }) => {
  const [progressChartDataSets, setProgressChartDataSets] = useState([]);
  const [loading, setLoading] = useState(true)
  const token = sessionStorage.getItem("token");
  const rect = document.body.getBoundingClientRect()
  const { darkMode } = useTheme();
  const timeLabels = ["0Hr", "2Hr", "4Hr", "6Hr", "8Hr", "10Hr", "12Hr"];

  // Function to format rupees with 'k' for thousands
  const formatRupees = useCallback((value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return `${value}`;
  }, []);

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "(Time of Day)",
        },
      },
      y: {
        // Left y-axis for (Numbers  / Currency / Percentage)
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "(Numbers  / Currency / Percentage)",
        },
        ticks: {
          callback: (value) => formatRupees(value),
        },
      }
    },
  };

  const data = {
    labels: timeLabels,
    datasets: progressChartDataSets,
  };

  // Function prepares the data for the chart to be displayed
  const prepareData = useCallback((data) => {
    const newData = data.result.series;
    matricsColors.forEach((ele, index) => {
      newData.forEach((e, i) => {
        if (e.name === ele.code) {
          e["label"] = ele.label;
          e["borderColor"] = ele.backgroundColor;
          e["backgroundColor"] = ele.backgroundColor;
          e["tension"] = ele.tension;
        }
      });
    });
    setProgressChartDataSets(newData);
    setLoading(false)
  }, [])

  // fetch data required for the creating progress line chart
  const metricsPerformanceLineChart = useCallback(() => {
    setLoading(true)
    fetch(
      "https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-USER-IDENTITY": IDENTITY_TOKEN,
        },
        body: JSON.stringify({
          startDate: "2024-06-08",
          endDate: "2024-07-07",
          metrics: selectedMatrices
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => prepareData(data))
      .catch((error) => {
        toast.error('Failed to fetch chart data, Try after some time!');
        setTimeout(() => {
          setLoading(false)
          console.error("Error:", error)
        }, 3000)
      });
  }, [token, selectedMatrices, prepareData]);

  useEffect(() => {
    metricsPerformanceLineChart();
  }, [metricsPerformanceLineChart, selectedMatrices]);

  if (loading) {
    return (
      <>
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
        <div className="flex justify-center mt-4">
          <CircularProgress style={{ color: "grey" }} />
        </div>
      </>
    );
  }

  return (
    <div className="overflow-x-auto p-3 w-full">
      <Line options={options} data={data} width={rect.width > 850 ? 700 : ''} />
    </div>
  );
};

export default PerformanceChart;
