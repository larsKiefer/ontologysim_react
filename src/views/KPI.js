import React, { Component, useState } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Nav, Tab } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/Sidebar";

import "../style/sidebar.css";
import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import colors from "../style/theme.module.scss";

import ProductKPI from "../components/kpi/ProductKPI";
import TransporterKPI from "../components/kpi/TransporterKPI";
import KPIUpdateBar from "../components/kpi/KPIUpdateBar";
import AllKPI from "../components/kpi/AllKPI";
import MachineKPI from "../components/kpi/MachineKPI";
import SimKPI from "../components/kpi/SimKPI";
import QueueKPI from "../components/kpi/QueueKPI";
import NoData from "../components/kpi/NoData";

const queryString = require("query-string");

/**
 * view all kpi data from simulation
 * @returns 
 */
function KPI() {
  const location = useLocation();
  const parsed = React.useMemo(() => queryString.parse(location.search), [
    location,
  ]);
  const history = useHistory();
  const kpi = useSelector((state) => state.kpi);

  const activeElement = React.useMemo(() => {
    return parsed.type;
  }, [parsed]);

  // set the tab bar element active
  const allStyle =
    activeElement == "all" || activeElement == undefined
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };
  const machineStyle =
    activeElement == "machine"
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };
  const queueStyle =
    activeElement == "queue"
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };
  const transporterStyle =
    activeElement == "transporter"
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };
  const simulationStyle =
    activeElement == "simulation"
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };
  const productStyle =
    activeElement == "product"
      ? {
          borderBottom: "solid",
          borderBottomWidth: "2px",
          borderColor: colors.primary,
          color: colors.primary,
        }
      : { color: colors.dark };

  //load kpi data depending on active tab element
  function loadKPIData() {
    var result = undefined;
    if (parsed.type == "all" || parsed.type == undefined) {
      if (Object.entries(kpi.machine).length > 0) {
        result = <AllKPI key="AllKPI"></AllKPI>;
      } else {
        result = <NoData></NoData>;
      }
    } else if (parsed.type == "transporter") {
      if (Object.entries(kpi.transporter).length > 0) {
        result = <TransporterKPI key="TransporterKPI"></TransporterKPI>;
      } else {
        result = <NoData></NoData>;
      }
    } else if (parsed.type == "machine") {
      if (Object.entries(kpi.machine).length > 0) {
        result = <MachineKPI></MachineKPI>;
      } else {
        result = <NoData></NoData>;
      }
    } else if (parsed.type == "product") {
      if (Object.entries(kpi.product).length > 0) {
        result = <ProductKPI></ProductKPI>;
      } else {
        result = <NoData></NoData>;
      }
    } else if (parsed.type == "simulation") {
      if (Object.entries(kpi.sim).length > 0) {
        result = <SimKPI></SimKPI>;
      } else {
        result = <NoData></NoData>;
      }
    } else if (parsed.type == "queue") {
      if (Object.entries(kpi.queue).length > 0) {
        result = <QueueKPI></QueueKPI>;
      } else {
        result = <NoData></NoData>;
      }
    }
    return result;
  }

  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid d-flex flex-column">
          <div className="row">
            <SidebarToggleButton name="KPIs"></SidebarToggleButton>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <KPIUpdateBar></KPIUpdateBar>
            </div>
          </div>

          <Row>
            <div className="col-12">
              <Nav className="flex-row border-bottom">
                <Nav.Item className="">
                  <Nav.Link
                    eventKey="all"
                    onClick={() => {
                      history.push("/simulation/kpis?type=all");
                    }}
                    style={allStyle}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="simulation"
                    onClick={() => {
                      history.push("/simulation/kpis?type=simulation");
                    }}
                    style={simulationStyle}
                  >
                    Simulation
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="machine"
                    onClick={() => {
                      history.push("/simulation/kpis?type=machine");
                    }}
                    style={machineStyle}
                  >
                    Machine
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="queue"
                    onClick={() => {
                      history.push("/simulation/kpis?type=queue");
                    }}
                    style={queueStyle}
                  >
                    Queue
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="transporter"
                    onClick={() => {
                      history.push("/simulation/kpis?type=transporter");
                    }}
                    style={transporterStyle}
                  >
                    Transporter
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="product"
                    onClick={() => {
                      history.push("/simulation/kpis?type=product");
                    }}
                    style={productStyle}
                  >
                    Product
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Row>
          <Row className="">
            <div className="col-12 ">{loadKPIData()}</div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withRouter(KPI);
