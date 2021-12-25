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

import KPITransporterSumTable from "../table/kpi/KPITransporterSumTable";
import KPITransporterTimeTable from "../table/kpi/KPITransporterTimeTable";
import KPIChart from "./KPIChart";
import KPITransporterLocationTable from "../table/kpi/KPITransporterLocationTable";
import TransporterLocationStage from "./TransporterLocationStage";
import SankeyDemo from "./SankeyChart/Sankey";

//kpi data which are shown
const importantKPIData = [
  {
    name: "AUITp",
    type: "Basic",
    toolbar: "Actual unit idle time in %",
    unit: "percentage",
  },
  {
    name: "AUTTp",
    type: "Basic",
    toolbar: "Actual unit transportation time in %",
    unit: "percentage",
  },
  {
    name: "AUSTp",
    type: "Basic",
    toolbar: "Actual unit setup time in %",
    unit: "percentage",
  },
  {
    name: "FE",
    type: "Defect",
    toolbar: "Number of failure events",
    unit: "name",
  },
  {
    name: "TTFp",
    type: "Defect",
    toolbar: "Time to failure in %",
    unit: "percentage",
  },
];

/**
 * element which handles transporter kpi data
 * @returns
 */
function TransporterKPI() {
  const kpiState = useSelector((state) => state.kpi);
  const [state, setState] = useState({
    summary: "card",
    time: "graph",
    location: "graph",
  });

  //summary table data
  var summarizedTableList = [];
  for (const [key, value] of Object.entries(
    kpiState.transporter["summarized"]
  )) {
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
    for (const [key, value] of Object.entries(
      kpiState.transporter["summarized"]
    )) {
      for (const [kpi, value2] of Object.entries(value)) {
        if (element.name == kpi) {
          summarizedObject["data"][key] = Number(
            ((value2 * 100) / 100).toFixed(2)
          );
        }
      }
    }
    kpiSummarizedList.push(summarizedObject);
  });

  //get chart data, aera chart
  const timeList = React.useMemo(() => kpiState.transporter["time"].time);
  const timeChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    importantKPIData.forEach((element) => {
      timeChartObjectList[element.name] = [];

      timeList.forEach((time, i) => {
        var objectChart = { name: time };
        Object.entries(kpiState.transporter["time"]).forEach(([key, value]) => {
          if (key != "time" && element.unit == "percentage") {
            objectChart[key] = Math.round(value[element.name][i] * 100);
          } else if (key != "time") {
            objectChart[key] = Math.round(value[element.name][i]);
          }
        });
        timeChartObjectList[element.name].push(objectChart);
      });
    });
    return timeChartObjectList;
  });

  //get time table data
  var timeTableList = [];
  var i = 0;
  timeList.forEach((element, i) => {
    var objectTime = {};
    objectTime["time"] = element;
    for (const [key, value] of Object.entries(
      kpiState.transporter["time"]["all"]
    )) {
      objectTime[key] = (Math.round(value[i] * 100) / 100).toFixed(2);
    }
    timeTableList.push(objectTime);
  });

  var locationTableList = [];
  const loactionTimeList = React.useMemo(
    () => kpiState.transporter_location["time"].time
  );

  loactionTimeList.forEach((element, i) => {
    var objectTime = {};
    objectTime["time"] = element;
    for (const [key, value] of Object.entries(
      kpiState.transporter_location["time"]["all"]
    )) {
      objectTime[key] = (Math.round(value[i] * 100) / 100).toFixed(2);
    }
    locationTableList.push(objectTime);
  });

  /**view summary element: table or charts */
  function summarizedOption() {
    if (state.summary == "table") {
      return (
        <div className="row pl-2 pr-2 pt-1 pb-2 bg-light">
          <div className="col-12 pb-0 pl-1 pr-1 ">
            <KPITransporterSumTable
              data={summarizedTableList}
            ></KPITransporterSumTable>
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
              <div
                className="col-md-6 col-xl-4 pl-1 pr-1 mt-2"
                kpi={"kpiChart" + key}
              >
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
            <KPITransporterTimeTable
              data={timeTableList}
            ></KPITransporterTimeTable>
          </div>
        </div>
      );
    }
  }

  //view location data (summary)
  var summarizedLocationColumn = [];
  var summarizedLocation = {};
  var objectKPI = {};
  if (
    Object.keys(kpiState.transporter_location["summarized"]).includes("all")
  ) {
    summarizedLocationColumn = Object.keys(
      kpiState.transporter_location["summarized"]["all"]
    );
    Object.entries(kpiState.transporter_location["summarized"]).forEach(
      ([key, value], i) => {
        summarizedLocation[key] = {};

        Object.entries(value).forEach(([key2, value2], i) => {
          summarizedLocation[key][key2] = value2;
        });
      }
    );
  }

  /**view location data of transporter: table or view */
  function locationOption() {
    if (state.location == "graph") {
      return (
        <div className="row pl-2 pr-2">
          <TransporterLocationStage
            data={summarizedLocation}
          ></TransporterLocationStage>
        </div>
      );
    } else {
      return (
        <div className="row pt-1 pb-2">
          <div className="col-12 pb-0  ">
            <KPITransporterLocationTable
              data={locationTableList}
              columns={summarizedLocationColumn}
            ></KPITransporterLocationTable>
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
  const styleButtonLocationTable =
    state.location == "table"
      ? "btn btn-sm btn-primary d-flex align-items-center"
      : "btn btn-sm btn-secondary d-flex align-items-center";
  const styleButtonLocationGraph =
    state.location == "graph"
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

      {/**location data */}
      <div className="row mt-4">
        <div className="col-12 d-flex ">
          <h5 className="align-self-center mb-0">Location graph</h5>
          <div className="ml-auto d-flex">
            <div className="btn-group align-self-center" role="group">
              <button
                className={styleButtonLocationGraph}
                onClick={() => setState({ ...state, location: "graph" })}
              >
                <GoGraph className="mr-2"> </GoGraph> Graphs
              </button>
              <button
                className={styleButtonLocationTable}
                onClick={() => setState({ ...state, location: "table" })}
              >
                <ImTable className="mr-2"></ImTable>Table
              </button>
            </div>
          </div>
        </div>
      </div>
      {locationOption()}

      <SankeyDemo></SankeyDemo>
    </div>
  );
}

export default TransporterKPI;
