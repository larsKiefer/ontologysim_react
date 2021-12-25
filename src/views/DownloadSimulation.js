import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import Sidebar from "../components/sidebar/Sidebar";
import { Card, Button } from "react-bootstrap";
import colors from "../style/theme.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { BiTimeFive, BiTimer } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import { getOWLDownload } from "../actions/downloadAction";
import { useEffect, useState } from "react";

import { refreshKPIs, getKpiList } from "../actions/kpiAction";

/**
 * all about downloading simulation
 * @param {*} props
 * @returns
 */
function DownloadSimulation(props) {
  const loadSimulation = useSelector((state) => state.loadSimulation);
  const eventState = useSelector((state) => state.event);
  const kpiState = useSelector((state) => state.kpi);

  const [state, setState] = useState({ isLoading: false, downloadKPI: false });

  const dispatch = useDispatch();

  const simulationState = useSelector((state) => state.simulation);

  //download owl file
  function owlDownload() {
    setState({ ...state, isLoading: true });
    getOWLDownload()
      .then((res) => {
        var data = res.data.file;
        var FileSaver = require("file-saver");
        var blob = new Blob([res.data.file], {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "simulation.owl");
        setState({ ...state, isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  function generate7Zip(data) {
    var JSZip = require("jszip");
    var FileSaver = require("file-saver");
    var zip = new JSZip();
    zip.folder("kpi");

    Object.entries(data).forEach(([type, value]) => {
      zip.folder("kpi/" + type);
      Object.entries(value["time"]).forEach(([object, nestedList]) => {
        console.log(nestedList, object, type);
        var csvData = nestedList
          .map(function (d) {
            return d.join();
          })
          .join("\n");
        zip.file("kpi/" + type + "/" + type + "_" + object + ".csv", csvData);
      });

      var csvData = value["summarized"]
        .map(function (d) {
          return d.join();
        })
        .join("\n");
      zip.file("kpi/" + type + "_summary" + ".csv", csvData);
    });

    zip.generateAsync({ type: "blob" }).then(function (blob) {
      FileSaver.saveAs(blob, "kpi.zip");
    });
  }

  //download kpi an zip the data
  function downloadKPIs() {
    setState({ ...state, downloadKPI: true });
    getKpiList().then((res) => {
      var data = res.data;

      generate7Zip(data);
      setState({ ...state, downloadKPI: false });
    });
  }

  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Download"></SidebarToggleButton>
          </div>
          <div className="row mt-3 d-flex">
            <div className="col-lg-6">
              <Card className="pb-0 pt-0">
                <Card.Body className="ml-2 mr-2 mt-0 mb-0 pb-2 pt-2">
                  <div className="row">
                    <div className="col-12 d-flex flex-row">
                      <div className="d-flex   ">
                        {simulationState.alreadyStarted ? (
                          <BsCheckCircle
                            className="mr-2 mt-1"
                            color={colors.primary}
                          ></BsCheckCircle>
                        ) : (
                          <BsXCircle
                            color={colors.primary}
                            className="mr-2  mt-1"
                          ></BsXCircle>
                        )}
                        <p className="text-left mb-0 ">Simulation started </p>
                      </div>
                      <div className="d-flex ml-md-4">
                        <BiTimeFive
                          className="mr-2 mt-1"
                          color={colors.primary}
                        ></BiTimeFive>
                        <p className="text-left mb-0 ">
                          time: {eventState.time > 0 ? eventState.time : "-"}{" "}
                        </p>
                      </div>
                      <div className="d-flex ml-md-4">
                        <AiOutlineFieldNumber
                          className="mr-2 mt-1"
                          color={colors.primary}
                        ></AiOutlineFieldNumber>
                        <p className="text-left mb-0 ">
                          Event Nr.:{" "}
                          {eventState.nrEvent > 0 ? eventState.nrEvent : "-"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="row mt-3 d-flex bg-light align-items-stretch">
            <div className="col-md-6 pb-3 pt-3">
              <h4 className="text-left">Save simulation state</h4>
              <Card>
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0 ml-2">
                    Download owl-file
                  </h6>
                </Card.Header>
                <Card.Body className="ml-2 mr-2">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex   ">
                        <p className="text-left mb-0 ">
                          Download owl-file with all data and at the current
                          simulation state.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        disabled={!simulationState.alreadyStarted}
                        className="mt-3"
                        onClick={() => owlDownload()}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 pb-3 pt-3 d-flex flex-column align-items-stretch ">
              <h4 className="text-left">Save KPI</h4>
              <Card className="w-100">
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0 ml-2">
                    Select default files
                  </h6>
                </Card.Header>
                <Card.Body className="ml-2 mr-2  d-flex flex-column ">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex   ">
                        <p className="text-left mb-0 ">
                          Download all kpis from the current simulation run.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        disabled={
                          !simulationState.alreadyStarted && !state.downloadKPI
                        }
                        className="mt-3"
                        onClick={() => downloadKPIs()}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row mt-4 d-flex">
            <div className="col-12">
              <h4 className="text-left">Download complete package</h4>
            </div>
            <div className="col-md-6 mt-3 mt-md-0 d-flex align-items-stretch ">
              <Card className="w-100">
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0 ml-2">
                    Safe file as zip-Files
                  </h6>
                </Card.Header>
                <Card.Body className="ml-2 mr-2  d-flex flex-column ">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="text-left mb-0 ">Download all data: </p>
                      <ul>
                        <li>
                          <p className="text-left mb-0"> ini-files</p>
                        </li>
                        <li>
                          <p className="text-left mb-0">event-files</p>
                        </li>
                        <li>
                          <p className="text-left mb-0">kpi-files</p>
                        </li>
                        <li>
                          <p className="text-left mb-0">owl-file</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <Button disabled={true} className="  " onClick={() => {}}>
                        Coming soon
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadSimulation;
