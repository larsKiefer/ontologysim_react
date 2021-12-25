import React, { Component, useState } from "react";
import { useLocation, withRouter, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  ButtonGroup,
  Button,
  Tabs,
  Tab,
  Nav,
} from "react-bootstrap";
import PlayStopElement from "../components/PlayStopCard";

import Sidebar from "../components/sidebar/Sidebar";
import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";

import colors from "../style/theme.module.scss";

import EventTable from "../components/table/event/EventTable";
import OrderReleaseTable from "../components/table/event/EventOrderReleaseTable";
import TransporterTable from "../components/table/event/EventTransporterTable";
import MachineTable from "../components/table/event/MachineTable";
import QueueTable from "../components/table/event/QueueTable";
import ProductTable from "../components/table/event/ProductTable";

import queryString from "query-string";
import FinishedFlashMessage from "../components/modals/FinishedFlashMessage";

/**
 * view event data
 * @returns 
 */
function Eventlist() {
  const location = useLocation();
  const parsed = React.useMemo(() => queryString.parse(location.search), [
    location,
  ]);
  const history = useHistory();

  const activeElement = React.useMemo(() => {
    return parsed.type;
  }, [parsed]);

  //design acitve tab bar
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
  const orderReleaseStyle =
    activeElement == "orderRelease"
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

  //load data (filter event list) dependent from view
  function loadEventData() {
    var result = undefined;
    if (parsed.type == "all" || parsed.type == undefined) {
      result = <EventTable className="mh-100 " style={{}}></EventTable>;
    } else if (parsed.type == "transporter") {
      result = <TransporterTable key="transporter"></TransporterTable>;
    } else if (parsed.type == "queue") {
      result = <QueueTable className="mh-100"></QueueTable>;
    } else if (parsed.type == "machine") {
      result = <MachineTable className="mh-100"></MachineTable>;
    } else if (parsed.type == "orderRelease") {
      result = <OrderReleaseTable className="mh-100"></OrderReleaseTable>;
    } else if (parsed.type == "product") {
      result = <ProductTable className="mh-100"></ProductTable>;
    }
    return result;
  }

  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Events"></SidebarToggleButton>
          </div>
          <div className="row">
            <FinishedFlashMessage></FinishedFlashMessage>
          </div>

          <div className="mt-2">
            <PlayStopElement></PlayStopElement>
          </div>

          <div>
            <Tab.Container defaultActiveKey="all">
              <Row>
                <div className="col-12">
                  <Nav className="flex-row border-bottom">
                    <Nav.Item className="">
                      <Nav.Link
                        eventKey="all"
                        onClick={() =>
                          history.push("/simulation/event?type=all")
                        }
                        style={allStyle}
                      >
                        All
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="machine"
                        onClick={() =>
                          history.push("/simulation/event?type=machine")
                        }
                        style={machineStyle}
                      >
                        Machine
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="queue"
                        onClick={() =>
                          history.push("/simulation/event?type=queue")
                        }
                        style={queueStyle}
                      >
                        Queue
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="transporter"
                        onClick={() =>
                          history.push("/simulation/event?type=transporter")
                        }
                        style={transporterStyle}
                      >
                        Transporter
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="orderRelease"
                        onClick={() =>
                          history.push("/simulation/event?type=orderRelease")
                        }
                        style={orderReleaseStyle}
                      >
                        Order Release
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="product"
                        onClick={() =>
                          history.push("/simulation/event?type=product")
                        }
                        style={productStyle}
                      >
                        Product
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Row>
              <Row>
                <div className="col-12">{loadEventData()}</div>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Eventlist);
