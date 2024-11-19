import React, { useState } from "react";
import Header from "./Navigation/Header";
import Sidebar from "./Navigation/SideBar";
import PerformanceChartHead from "./performanceChart/PerformanceChartHead";
import PerformanceChart from "./performanceChart/PerformanceChart";
import HeatMapTable from "./headMapTable/HeatMapTable";
import { ContentWrapper } from "../../utils/Wrapper";

const DashBoard = ({ SetIsLoggedIn }) => {
  const rect = document.body.getBoundingClientRect()
  const [selectedMatrices, setSelectedMatrics] = useState(["CPC", "ACOS", "ROAS", "CR_perc", "CPM"])
  const accumulateSelectedOptions = (options) => {
    setSelectedMatrics(options)
  }


  return (
    <div>
      <Header SetIsLoggedIn={SetIsLoggedIn} />
      {rect.width > '850' && <Sidebar />}
      <ContentWrapper>
        <PerformanceChartHead accumulateSelectedOptions={accumulateSelectedOptions} selectedMatrices={selectedMatrices} />
        <PerformanceChart selectedMatrices={selectedMatrices} />
      </ContentWrapper>
      <ContentWrapper>
        <HeatMapTable />
      </ContentWrapper>
    </div>
  );
};

export default DashBoard;
