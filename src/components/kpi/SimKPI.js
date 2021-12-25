import { useSelector } from "react-redux";
import React, { useState } from "react";

import { Card, ProgressBar, OverlayTrigger, Button } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import colors from "../../style/theme.module.scss";
import ReactTooltip from "react-tooltip";
import SummaryKPICard from "./SummaryKPICard";
import { ImTable } from "react-icons/im";
import { BsCardList } from "react-icons/bs";
import { GoGraph } from "react-icons/go";

import KPISimulationSumTable from "../table/kpi/KPISimulationSumTable";
import KPISimulationTimeTable from "../table/kpi/KPISimulationTimeTable";
import KPIChart from "./KPIChart";

//kpi data which are shown
const importantKPIData = [
  {
    name: "AR",
    type: "KPIs",
    toolbar: "Allocation ratio in %",
    unit: "percentage",
  },
  {
    name: "PR",
    type: "KPIs",
    toolbar: "Production process ratio in %",
    unit: "percentage",
  },
  { name: "WIP", type: "Basic", toolbar: "Work in process", unit: "number" },
  {
    name: "logging_time",
    type: "Basic",
    toolbar: "logging time of siumulation run",
    unit: "number",
  },
];

/**
 * element which handles simulation kpi data
 * @returns
 */
function SimKPI() {
  const kpiState = useSelector((state) => state.kpi);
  const [state, setState] = useState({ summary: "card", time: "graph" });

  //summary table data
  var summarizedTableList = [];
  for (const [key, value] of Object.entries(kpiState.sim["summarized"])) {
    var objectKPI = {};

    objectKPI["name"] = key;

    for (const [kpi, value2] of Object.entries(value)) {
      objectKPI[kpi] = Math.round(value2 * 100) / 100;
    }
    summarizedTableList.push(objectKPI);
  }

  //summary chart data
  var kpiSummarizedList = [];
  importantKPIData.forEach((element) => {
    var summarizedObject = {};
    summarizedObject = { ...summarizedObject, ...element };
    summarizedObject["data"] = {};
    for (const [key, value] of Object.entries(kpiState.sim["summarized"])) {
      for (const [kpi, value2] of Object.entries(value)) {
        if (element.name == kpi) {
          if (element.unit == "percentage") {
            summarizedObject["data"][key] = Number(
              ((value2 * 100) / 100).toFixed(2)
            );
          } else {
            if (value2 > 10) {
              summarizedObject["data"][key] = Number(
                Math.round(value2).toFixed(0)
              );
            } else {
              summarizedObject["data"][key] = Number(
                ((value2 * 100) / 100).toFixed(1)
              );
            }
          }
        }
      }
    }
    kpiSummarizedList.push(summarizedObject);
  });

  //get chart data, aera chart
  const timeList = React.useMemo(() => kpiState.sim["time"].time);
  const timeChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    importantKPIData.forEach((element) => {
      if (element.name != "logging_time") {
        timeChartObjectList[element.name] = [];

        timeList.forEach((time, i) => {
          var objectChart = { name: time };
          Object.entries(kpiState.sim["time"]).forEach(([key, value]) => {
            if (key != "time" && element.unit == "percentage") {
              objectChart[key] = Math.round(value[element.name][i] * 100);
            } else if (key != "time") {
              objectChart[key] = Math.round(value[element.name][i]).toFixed(2);
            }
          });
          timeChartObjectList[element.name].push(objectChart);
        });
      }
    });
    return timeChartObjectList;
  });

  //get time table data
  var timeTableList = [];
  var i = 0;
  timeList.forEach((element, i) => {
    var objectTime = {};
    objectTime["time"] = element;
    for (const [key, value] of Object.entries(kpiState.sim["time"]["all"])) {
      objectTime[key] = (Math.round(value[i] * 100) / 100).toFixed(2);
    }
    timeTableList.push(objectTime);
  });

  /**view summary element: table or charts */
  function summarizedOption() {
    if (state.summary == "table") {
      return (
        <div className="row pl-2 pr-2 pt-1 pb-2 bg-light">
          <div className="col-12 pb-0 pl-1 pr-1 ">
            <KPISimulationSumTable
              data={summarizedTableList}
            ></KPISimulationSumTable>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row pl-2 pr-2 pt-1 pb-3 bg-light">
          {kpiSummarizedList.map((element) => {
            return (
              <div className="col-md-4 col-sm-6 col-lg-3 col-xl-2 pt-2  pl-1 pr-1 ">
                <SummaryKPICard
                  name={element.name}
                  toolbar={element.toolbar}
                  type={element.type}
                  unit={element.unit}
                  data={element.data}
                ></SummaryKPICard>
              </div>
            );
          })}
        </div>
      );
    }
  }

  /** view time element: table or chart */
  function timeOption() {
    if (state.time == "graph") {
      return (
        <div className="row pl-2 pr-2">
          {Object.entries(timeChartObjectList).map(([key, value]) => {
            var filteredValue = importantKPIData.filter(
              (element) => element.name == key
            );
            var toolTip = "";
            if (filteredValue.length > 0) {
              toolTip = filteredValue[0].toolbar;
            }

            return (
              <div className="col-md-6 col-xl-4 pl-1 pr-1 mt-2">
                <KPIChart data={value} name={key} tooltip={toolTip}></KPIChart>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="row pt-1 pb-2">
          <div className="col-12 pb-0  ">
            <KPISimulationTimeTable
              data={timeTableList}
            ></KPISimulationTimeTable>
          </div>
        </div>
      );
    }
  }

  //change button style / toggle between table and graph
  const styleButtonSumTable =
    state.summary == "table"
      ? "btn btn-sm btn-primary d-flex align-items-center"
      : "btn btn-sm btn-secondary d-flex align-items-center";
  const styleButtonSumCard =
    state.summary == "card"
      ? "btn btn-sm btn-primary d-flex align-items-center"
      : "btn btn-sm btn-secondary d-flex align-items-center";
  const styleButtonTimeTable =
    state.time == "table"
      ? "btn btn-sm btn-primary d-flex align-items-center"
      : "btn btn-sm btn-secondary d-flex align-items-center";
  const styleButtonTimeGraph =
    state.time == "graph"
      ? "btn btn-sm btn-primary d-flex align-items-center"
      : "btn btn-sm btn-secondary d-flex align-items-center";

  const now = 60;
  return (
    <div className="container-fluid">
      <div className="row pt-2 bg-light">
        <div className="col-12 d-flex">
          <h5 className="align-self-center mb-0">Summary KPIs</h5>
          <div className="ml-auto d-flex">
            <div className="btn-group align-self-center" role="group">
              <button
                className={styleButtonSumCard}
                onClick={() => setState({ ...state, summary: "card" })}
              >
                <BsCardList className="mr-2"> </BsCardList> Cards
              </button>
              <button
                className={styleButtonSumTable}
                onClick={() => setState({ ...state, summary: "table" })}
              >
                <ImTable className="mr-2"></ImTable>Table
              </button>
            </div>
          </div>
        </div>
      </div>
      {summarizedOption()}

      <div className="row mt-4">
        <div className="col-12 d-flex ">
          <h5 className="align-self-center mb-0">Time KPIs</h5>
          <div className="ml-auto d-flex">
            <div className="btn-group align-self-center" role="group">
              <button
                className={styleButtonTimeGraph}
                onClick={() => setState({ ...state, time: "graph" })}
              >
                <GoGraph className="mr-2"> </GoGraph> Graphs
              </button>
              <button
                className={styleButtonTimeTable}
                onClick={() => setState({ ...state, time: "table" })}
              >
                <ImTable className="mr-2"></ImTable>Table
              </button>
            </div>
          </div>
        </div>
      </div>
      {timeOption()}
    </div>
  );
}

export default SimKPI;
