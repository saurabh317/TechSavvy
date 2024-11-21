import React, { useState } from "react";
import Header from "./Navigation/Header";
import Sidebar from "./Navigation/SideBar";
import PerformanceChartHead from "./performanceChart/PerformanceChartHead";
import PerformanceChart from "./performanceChart/PerformanceChart";
import HeatMapTable from "./headMapTable/HeatMapTable";
import { ContentWrapper } from "../../utils/Wrapper";
import { Divider } from "@mui/material";

const DashBoard = ({ SetIsLoggedIn }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const rect = document.body.getBoundingClientRect()
  const [selectedMatrices, setSelectedMatrics] = useState(["CPC", "ACOS", "ROAS", "CR_perc", "CPM"])
  const accumulateSelectedOptions = (options) => {
    setSelectedMatrics(options)
  }

  return (
    <div>
      <Header
        SetIsLoggedIn={SetIsLoggedIn}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {rect.width > '850' && <Sidebar />}
      <ContentWrapper>
        <PerformanceChartHead accumulateSelectedOptions={accumulateSelectedOptions} selectedMatrices={selectedMatrices} />
        <Divider />
        <PerformanceChart
          startDate={startDate}
          endDate={endDate}
          selectedMatrices={selectedMatrices}
        />
      </ContentWrapper>
      <ContentWrapper>
        <HeatMapTable
          startDate={startDate}
          endDate={endDate}
        />
      </ContentWrapper>
    </div>
  );
};

export default DashBoard;
