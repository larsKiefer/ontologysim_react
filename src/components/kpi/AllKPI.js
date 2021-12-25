import { useSelector } from "react-redux";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import DashboardKPI from "./DashboardKPI";

import { Card, ProgressBar, OverlayTrigger, Button } from "react-bootstrap";
import colors from "../../style/theme.module.scss";
import { useHistory } from "react-router";
import DashboardProductKPI from "./DashboardProductKPI";
import { BiTimeFive, BiTimer } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FiPercent } from "react-icons/fi";

/**
 * summary kpi card with transporter, machine, product and queue
 * @param {*} props 
 * @returns 
 */
function AllKPI(props) {
  const kpiState = useSelector((state) => state.kpi);
  const history = useHistory();
  const COLORS = [
    colors.primary,
    colors.dark,
    colors.info,
    colors.secondary,
    colors.warning,
  ];

  //visualised kpis
  const transporterKeyList = React.useMemo(
    () => ["AUTTp", "AUSTp", "ADOTp", "AUITp"],
    [kpiState]
  );
  const machineKeyList = React.useMemo(
    () => ["AUPTp", "AUSTp", "ADOTp", "AUITp"],
    [kpiState]
  );
  const productKeyList = React.useMemo(
    () => ["APTp", "AQMTp", "ATTp", "AUSTnpp", "AUSTp"],
    [kpiState]
  );
  const queueKeyList = React.useMemo(() => ["FillLevel"], [kpiState]);

  //summarize transporter kpis
  const kpiTransporterSummarizedList = React.useMemo(() => {
    var kpiSummarizedList = [];

    transporterKeyList.forEach((element) => {
      var summarizedObject = {};
      for (const [kpi, value2] of Object.entries(
        kpiState.transporter["summarized"]["all"]
      )) {
        if (element == kpi) {
          kpiSummarizedList.push({
            name: kpi,
            value: Number(((value2 * 100) / 100).toFixed(2)),
          });
        }
      }
    });
    return kpiSummarizedList;
  }, [kpiState]);

  //summarize queue kpis
  const kpiQueueSummarizedList = React.useMemo(() => {
    var kpiSummarizedList = [];

    queueKeyList.forEach((element) => {
      var summarizedObject = {};
      for (const [kpi, value2] of Object.entries(
        kpiState.queue["summarized"]["all"]
      )) {
        if (element == kpi) {
          kpiSummarizedList.push({
            name: kpi,
            value: Number(((value2 * 100) / 100).toFixed(2)),
          });
          kpiSummarizedList.push({
            name: "Empty",
            value: Number(1 - ((value2 * 100) / 100).toFixed(2)),
          });
        }
      }
    });

    return kpiSummarizedList;
  }, [kpiState]);

  const aoetValue = React.useMemo(() => {
    return Math.round(kpiState.product["summarized"]["all"]["AOET"]);
  }, [kpiState]);

  //summarize machine kpis
  const kpiMachineSummarizedList = React.useMemo(() => {
    var kpiSummarizedList = [];

    machineKeyList.forEach((element) => {
      var summarizedObject = {};
      for (const [kpi, value2] of Object.entries(
        kpiState.machine["summarized"]["all"]
      )) {
        if (element == kpi) {
          kpiSummarizedList.push({
            name: kpi,
            value: Number(((value2 * 100) / 100).toFixed(2)),
          });
        }
      }
    });
    return kpiSummarizedList;
  }, [kpiState]);

  //summarize product kpis
  const kpiProductSummarizedList = React.useMemo(() => {
    var kpiSummarizedList = [];

    productKeyList.forEach((element) => {
      var summarizedObject = {};
      for (const [kpi, value2] of Object.entries(
        kpiState.product["summarized"]["all"]
      )) {
        if (element == kpi) {
          kpiSummarizedList.push({
            name: kpi,
            value: Number(((value2 * 100) / 100).toFixed(2)),
          });
        }
      }
    });
    return kpiSummarizedList;
  }, [kpiState]);

  const timeList = React.useMemo(() => kpiState.transporter["time"].time, [
    kpiState,
  ]);

  //summarize time data for chart for transporter
  const timeTransporterChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    timeList.forEach((time, i) => {
      var objectChart = { name: time };
      Object.entries(kpiState.transporter["time"]).forEach(([key, value]) => {
        if (key == "all") {
          transporterKeyList.forEach((element) => {
            objectChart[element] = Number(
              ((value[element][i] * 100) / 100).toFixed(2)
            );
          });
        }
      });
      timeChartObjectList.push(objectChart);
    });
    return timeChartObjectList;
  }, [kpiState]);

  //summarize time data for chart for machine
  const timeMachineChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    timeList.forEach((time, i) => {
      var objectChart = { name: time };
      Object.entries(kpiState.machine["time"]).forEach(([key, value]) => {
        if (key == "all") {
          machineKeyList.forEach((element) => {
            objectChart[element] = Number(
              ((value[element][i] * 100) / 100).toFixed(2)
            );
          });
        }
      });
      timeChartObjectList.push(objectChart);
    });
    return timeChartObjectList;
  }, [kpiState]);

  //summarize time data for chart for queue
  const timeQueueChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    timeList.forEach((time, i) => {
      var objectChart = { name: time };
      Object.entries(kpiState.queue["time"]).forEach(([key, value]) => {
        if (key == "all") {
          queueKeyList.forEach((element) => {
            objectChart[element] = Number(
              ((value[element][i] * 100) / 100).toFixed(2)
            );
          });
        }
      });
      timeChartObjectList.push(objectChart);
    });
    return timeChartObjectList;
  }, [kpiState]);

  //summarize time data for chart for product
  const timeProductChartObjectList = React.useMemo(() => {
    var timeChartObjectList = [];
    timeList.forEach((time, i) => {
      var objectChart = { name: time };
      Object.entries(kpiState.product["time"]).forEach(([key, value]) => {
        if (key == "all") {
          productKeyList.forEach((element) => {
            objectChart[element] = Number(
              ((value[element][i] * 100) / 100).toFixed(2)
            );
          });
        }
      });
      timeChartObjectList.push(objectChart);
    });
    return timeChartObjectList;
  }, [kpiState]);

  return (
    <div className="container-fluid">
      <div className="row  ">
        <div className="col-12 pl-1 pr-1 mt-2">
          <Card className="">
            <Card.Body className="pl-2 pr-2 pt-2 ">
              <div className="d-flex align-items-end ">
                <h5 className="mb-0 text-left">Simulation</h5>
                <p
                  className="mb-0 ml-auto text-primary"
                  type="button"
                  onClick={() =>
                    history.push("/simulation/kpis?type=simulation")
                  }
                  style={{ fontSize: 10 }}
                >
                  {"Details >"}{" "}
                </p>
              </div>
              <div className="row mt-2 pl-2 pr-3">
                <div className="col-6 col-sm-4 mt-2 col-md-3 col-lg-2 pl-1  pr-1">
                  <Card
                    className=""
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Card.Body className="pt-2 pb-2 ">
                      <FiPercent color={colors.white}></FiPercent>
                      <h4 className="mb-0 text-white">
                        {Math.round(
                          kpiState.machine["summarized"]["all"]["OEE"] * 100
                        ).toFixed(2)}
                      </h4>
                      <p className="mb-0 text-white">OEE</p>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-6 col-sm-4 mt-2 col-md-3 col-lg-2 pl-1  pr-1">
                  <Card className="" style={{ backgroundColor: colors.info }}>
                    <Card.Body className="pt-2 pb-2">
                      <BiTimer color={colors.white} size={15}></BiTimer>
                      <h4 className="mb-0 text-white">
                        {" "}
                        {Math.round(
                          kpiState.sim["summarized"]["all"]["logging_time"]
                        )}
                      </h4>

                      <p className="mb-0 text-white">Time</p>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-6 col-sm-4 mt-2 col-md-3 col-lg-2 pl-1  pr-1">
                  <Card
                    className=""
                    style={{ backgroundColor: colors.primaryLight }}
                  >
                    <Card.Body className="pt-2 pb-2">
                      <AiOutlineFieldNumber
                        color={colors.white}
                        size={15}
                      ></AiOutlineFieldNumber>
                      <h4 className="mb-0 text-white">
                        {Math.round(
                          kpiState.sim["summarized"]["all"]["WIP"] * 10
                        ) / 10}
                      </h4>

                      <p className="mb-0 text-white">WIP</p>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-6 col-sm-4 mt-2 col-md-3 col-lg-2 pl-1  pr-1">
                  <Card
                    className=""
                    style={{ backgroundColor: colors.infoLight }}
                  >
                    <Card.Body className="pt-2 pb-2">
                      <BiTimeFive color={colors.white}></BiTimeFive>

                      <h4 className="mb-0 text-white">
                        {Math.round(
                          kpiState.product["summarized"]["all"]["AOET"] * 10
                        ) / 10}
                      </h4>

                      <p className="mb-0 text-white">AOET</p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row  ">
        <div className="col-lg-6 col-12 mt-2 pl-1 pr-1">
          <DashboardKPI
            colors={COLORS}
            name={"Transporter"}
            timeList={timeList}
            keyList={transporterKeyList}
            timeChartObjectList={timeTransporterChartObjectList}
            kpiSummarizedList={kpiTransporterSummarizedList}
            historyPush={() =>
              history.push("/simulation/kpis?type=transporter")
            }
          ></DashboardKPI>
        </div>
        <div className="col-lg-6 col-12 mt-2 pl-1 pr-1">
          <DashboardKPI
            colors={COLORS}
            name={"Machine"}
            timeList={timeList}
            keyList={machineKeyList}
            timeChartObjectList={timeMachineChartObjectList}
            kpiSummarizedList={kpiMachineSummarizedList}
            historyPush={() => history.push("/simulation/kpis?type=machine")}
          ></DashboardKPI>
        </div>
        <div className="col-lg-6 col-12 mt-2 pl-1 pr-1">
          <DashboardProductKPI
            AOET={aoetValue}
            colors={COLORS}
            name={"Product"}
            timeList={timeList}
            keyList={productKeyList}
            timeChartObjectList={timeProductChartObjectList}
            kpiSummarizedList={kpiProductSummarizedList}
            historyPush={() => history.push("/simulation/kpis?type=product")}
          ></DashboardProductKPI>
        </div>
        <div className="col-lg-6 col-12 mt-2 pl-1 pr-1">
          <DashboardKPI
            colors={COLORS}
            name={"Queue"}
            timeList={timeList}
            keyList={queueKeyList}
            timeChartObjectList={timeQueueChartObjectList}
            kpiSummarizedList={kpiQueueSummarizedList}
            historyPush={() => history.push("/simulation/kpis?type=queue")}
          ></DashboardKPI>
        </div>
      </div>
    </div>
  );
}

export default AllKPI;
