import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Row, Button, Card, Form } from "react-bootstrap";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import Dropzone from "react-dropzone";
import { BsArrowRightShort } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import colors from "../style/theme.module.scss";
import {
  getSimulationDefaultFile,
  runCompleteSimulation,
} from "../actions/loadSimulationAction";
import { actions } from "react-table";

import { useForm } from "react-hook-form";
import FinishedFlashMessage from "../components/modals/FinishedFlashMessage";

/**
 * loadin gfiles for simulation
 * @returns
 */
function LoadSimulation() {
  const loadSimulation = useSelector((state) => state.loadSimulation);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors, reset } = useForm();

  function resetSelection() {
    dispatch({ type: "RESET_SELECTION" });
  }

  const history = useHistory();

  async function onSubmit(data) {
    dispatch(runCompleteSimulation(data, loadSimulation));
  }

  //load files when drag and drop
  function loadFiles() {
    var output = [];
    if (acceptedFiles.length != 0) {
      acceptedFiles.map((file, i) => {
        const reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
        };

        reader.onloadend = () => {
          output.push({ path: file.path, content: reader.result });
          if (acceptedFiles.length == i + 1) {
            dispatch({
              type: "LOAD_FILES",
              payload: {
                files: output.map((element) => {
                  console.log(element);
                  return element;
                }),
              },
            });
          }
        };
      });
    } else {
      dispatch({
        type: "CHANGE_SELECTION",
        payload: { isDefaultSelected: false, isDragDropSelected: true },
      });
    }
  }

  //load default simulation data
  useEffect(() => {
    if (loadSimulation.defaultFiles.length == 0) {
      dispatch(getSimulationDefaultFile());
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: ".ini" });

  //view drag and drop files
  function loadDragDropFiles() {
    var files = [];
    var output = [];
    if (acceptedFiles.length != 0) {
      files = acceptedFiles.map((file) => file);
      output.push(
        <ol className="text-left">
          {" "}
          {files.map((element) => (
            <li key={element.path}>{element.path}</li>
          ))}
        </ol>
      );
    } else if (loadSimulation.length != 0) {
      output.push(
        <ol className="text-left">
          {" "}
          {loadSimulation.files.map((element) => (
            <li key={element.path}>{element.path}</li>
          ))}
        </ol>
      );
    } else {
      output.push(<p>no files selected</p>);
    }

    return output;
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Upload"></SidebarToggleButton>
          </div>
          {/**drag drop vs default selection */}
          <div className="row mt-3 d-flex">
            <div className="col-md-6">
              <Card>
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0 ml-2">Select files</h6>
                  {loadSimulation.isDragDropSelected && (
                    <FiCheckCircle
                      className="ml-auto"
                      size={20}
                      color={colors.primary}
                    ></FiCheckCircle>
                  )}
                </Card.Header>
                <Card.Body className="ml-2 mr-2">
                  <h4 className="text-left ">Drag & Drowp</h4>
                  <div {...getRootProps({ style })}>
                    <input
                      {...getInputProps()}
                      onClick={() => {
                        resetSelection();
                      }}
                    />

                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside>
                    <h4 className="text-left mt-2">Files</h4>
                    {loadDragDropFiles()}
                  </aside>

                  <Button
                    disabled={
                      (acceptedFiles.length == 0 &&
                        loadSimulation.files.length == 0) ||
                      loadSimulation.isDragDropSelected
                    }
                    className="d-flex mt-3"
                    onClick={() => loadFiles()}
                  >
                    {loadSimulation.isDragDropSelected ? "Selected" : "Submit"}
                  </Button>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-6 mt-3 mt-md-0 d-flex align-items-stretch ">
              <Card className="w-100">
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0 ml-2">
                    Select default files
                  </h6>
                  {loadSimulation.isDefaultSelected && (
                    <FiCheckCircle
                      className="ml-auto"
                      size={20}
                      color={colors.primary}
                    ></FiCheckCircle>
                  )}
                </Card.Header>
                <Card.Body className="ml-2 mr-2  d-flex flex-column ">
                  <h4 className="text-left">Files</h4>
                  {loadSimulation.defaultFiles.length != 0 ? (
                    <ol className="text-left  ">
                      {loadSimulation.defaultFiles.map((element) => (
                        <li key={element}>{element}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>no files selected</p>
                  )}
                  <div className="mt-3 mt-auto ">
                    <Button
                      disabled={
                        loadSimulation.defaultFiles.length == 0 ||
                        loadSimulation.isDefaultSelected
                      }
                      className=" d-flex justify-content-start "
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_SELECTION",
                          payload: {
                            isDefaultSelected: true,
                            isDragDropSelected: false,
                          },
                        })
                      }
                    >
                      {loadSimulation.isDefaultSelected ? "Selected" : "Submit"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

        {/* run simulation at once settings */}
          <div className="row mt-5 d-flex bg-light pt-2 ">
            <div className="col-12 mt-3 mb-3">
              <h4 className="">Run simulation</h4>
            </div>
          </div>
          <div className="row">
            <FinishedFlashMessage></FinishedFlashMessage>
          </div>
          <div className="row pt-2 d-flex pb-5 bg-light">
            <div className="col-md-6">
              <Card className="w-100">
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0">
                    Run simulation at once
                  </h6>
                </Card.Header>
                <Card.Body>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="d-flex flex-column align-items-start"
                  >
                    <Form.Group className="d-flex flex-column align-items-start">
                      <Form.Check
                        {...register("eventData")}
                        name="eventData"
                        type="checkbox"
                        label="Event data"
                        className=""
                      />
                      <p className="pl-4 mb-0" style={{ fontSize: 10 }}>
                        {"Only recommended for small number of products <1000"}
                      </p>
                      <Form.Check
                        {...register("kpiData")}
                        name="kpiData"
                        type="checkbox"
                        label="KPI data"
                      />
                    </Form.Group>
                    {!loadSimulation.isLoading ? (
                      <div className="mt-3 mt-auto ">
                        <Button
                          disabled={
                            loadSimulation.defaultFiles.length == 0 ||
                            loadSimulation.isDragDropSelected &
                              (loadSimulation.files.length == 0) ||
                            !loadSimulation.isDragDropSelected &
                              !loadSimulation.isDefaultSelected ||
                            loadSimulation.isLoading
                          }
                          type="Submit"
                        >
                          Submit
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex ">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <p className="pl-4 mb-0 align-self-center">
                          Simulation loading ....
                        </p>
                      </div>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6  mt-3 mt-md-0 d-flex align-items-stretch">
              <Card className="w-100">
                <Card.Header className="d-flex">
                  <h6 className="text-left mb-0 pb-0">
                    Run simulation iterative
                  </h6>
                </Card.Header>
                <Card.Body className="d-flex ">
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      disabled={
                        loadSimulation.defaultFiles.length == 0 ||
                        loadSimulation.isDragDropSelected &
                          (loadSimulation.files.length == 0) ||
                        !loadSimulation.isDragDropSelected &
                          !loadSimulation.isDefaultSelected
                      }
                      style={{ width: "200px" }}
                      onClick={() => history.push("/simulation/view")}
                      className="mb-1"
                    >
                      {" "}
                      Goto View{" "}
                      <BsArrowRightShort size={25}></BsArrowRightShort>{" "}
                    </Button>
                    <Button
                      disabled={
                        loadSimulation.defaultFiles.length == 0 ||
                        loadSimulation.isDragDropSelected &
                          (loadSimulation.files.length == 0) ||
                        !loadSimulation.isDragDropSelected &
                          !loadSimulation.isDefaultSelected
                      }
                      style={{ width: "200px" }}
                      onClick={() => history.push("/simulation/event")}
                    >
                      {" "}
                      Goto Events{" "}
                      <BsArrowRightShort size={25}></BsArrowRightShort>{" "}
                    </Button>
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

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default withRouter(LoadSimulation);
