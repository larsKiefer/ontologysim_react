import React, { Component, useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  Container,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { startLoadSimulationUntilTime } from "../../actions/eventAction";
import useWindowDimensions from "../useWindowDimensions";
import { CgAdd } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { getSimulationDefaultFile } from "../../actions/loadSimulationAction";
import { useForm, Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { refreshKPIs } from "../../actions/kpiAction";

/**
 * top bar for update kpi data and view time and number of events
 * @returns
 */
function KPIUpdateBar() {
  const { register, handleSubmit, control } = useForm();

  var simulationState = useSelector((state) => state.simulation);
  var loadSimulationState = useSelector((state) => state.loadSimulation);
  var eventlistState = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadSimulationState.defaultFiles.length == 0) {
      dispatch(getSimulationDefaultFile());
    }
  }, []);

  return (
    <div className="card w-100 pl-1 pr-1 pt-1 pb-1">
      <div className="row  ">
        <div className="col-12 d-flex">
          <div className="d-flex flex-column ">
            <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
              Current status
            </h6>

            <div className="d-flex align-items-center flex-fill ">
              <h6 className="mb-0 mr-2 align-self-center  ">
                Time: {eventlistState.time}
              </h6>
            </div>
          </div>
          <div className="ml-auto pl-2 ">
            <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
              Refresh KPI data
            </h6>

            <div className="d-flex  ">
              <Button
                className="btn-sm btn-primary d-flex align-items-center"
                onClick={() => {
                  dispatch(refreshKPIs());
                }}
              >
                <FiRefreshCw className="mr-2"></FiRefreshCw> Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KPIUpdateBar;
