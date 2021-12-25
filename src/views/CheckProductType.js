import React, { Component, useState, useEffect } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Arrow,
  Group,
} from "react-konva";
import Konva from "konva";
import useWindowDimensions from "../components/useWindowDimensions";
import Process from "../components/process/Process";
import State from "../components/process/State";

import { getProductType } from "../actions/productTypeAction";

import colors from "../style/theme.module.scss";

/**
 * check product type, defined by process id list
 * @returns 
 */
function CheckProductType() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [stateDiagram, setStateDiagram] = useState([]);
  const [stateArrows, setStateArrows] = useState([]);

  // create product type tree
  async function onSubmit(data) {
    getProductType(data)
      .then((res) => {
        var startState = res.data.source_state;
        var processData = res.data.process_info;
        var maxNumber = res.data.max_state;
        var pathList = [...res.data.path];
        var lastState = startState;
        var lastProcess = [];
        var stateElements = {};
        var processElements = {};
        var arrowElements = [];
        var printResult = [];
        var xDiff = 200;
        var yDiff = 200;
        var algorithmFinished = false;

        var sinkLocation = {
          x:
            0 + (xDiff - 100) * (maxNumber - 1) + xDiff * (maxNumber - 1) + 100,
          y: 0,
        };
        var arrowOffset = {
          xState: 100,
          yState: 50,
          xProcess: 50,
          yProcess: 0,
        };

        while (!algorithmFinished) {
          lastState.forEach((state) => {
            var filteredElement = pathList.filter(
              (elementFilter) => elementFilter.state == state
            );

            filteredElement.forEach((filteredState) => {
              if (!Object.entries(stateElements).includes(filteredState)) {
                if (filteredState.reverse_process.length == 0) {
                  stateElements[filteredState.state] = { x: 0, y: 0 };
                  printResult.push(
                    <State
                      x={0}
                      y={0}
                      name={filteredState.state.replace("state", "")}
                    ></State>
                  );
                } else {
                  if (stateElements[filteredState.state] == undefined) {
                    if (filteredState.forward_process.length == 0) {
                      stateElements[filteredState.state] = {
                        x: sinkLocation.x - 100,
                        y: sinkLocation.y,
                      };
                      printResult.push(
                        <State
                          x={sinkLocation.x - 100}
                          y={sinkLocation.y}
                          name={filteredState.state.replace("state", "")}
                        ></State>
                      );
                    } else {
                      var processDict = null;
                      for (
                        var i = 0;
                        i < filteredState.reverse_process.length;
                        i++
                      ) {
                        if (
                          processElements[filteredState.reverse_process[i]] !=
                          undefined
                        ) {
                          processDict =
                            processElements[filteredState.reverse_process[i]];
                          break;
                        }
                      }
                      stateElements[filteredState.state] = {
                        x: processDict.x + xDiff - 100,
                        y: processDict.y - 50,
                      };
                      printResult.push(
                        <State
                          x={stateElements[filteredState.state].x}
                          y={stateElements[filteredState.state].y}
                          name={filteredState.state.replace("state", "")}
                        ></State>
                      );
                    }
                  } else {
                  }

                  filteredState.reverse_process.forEach((process) => {
                    if (processElements[process]) {
                      arrowElements.push(
                        <Arrow
                          x={processElements[process].x}
                          y={processElements[process].y}
                          points={[
                            0 + arrowOffset.xProcess,
                            0 + arrowOffset.yProcess,
                            stateElements[filteredState.state].x -
                              processElements[process].x,
                            stateElements[filteredState.state].y -
                              processElements[process].y +
                              arrowOffset.yState,
                          ]}
                          stroke={colors.dark}
                          tension={0}
                          pointerLength={20}
                          pointerWidth={20}
                          fill={colors.dark}
                        />
                      );
                    }
                  });
                }

                var x = stateElements[filteredState.state].x;
                var y = stateElements[filteredState.state].y;

                var number_of_processes = filteredState.forward_process.length;
                var i = number_of_processes;

                filteredState.forward_process.forEach((process) => {
                  processElements[process] = {
                    x: x + xDiff,
                    y:
                      y +
                      50 +
                      (i - 1) * yDiff -
                      ((number_of_processes - 1) / 2) * yDiff,
                  };

                  var processFiltered = processData.filter(
                    (processFilter) =>
                      processFilter.product_type_process_name == process
                  )[0];
                  printResult.push(
                    <Process
                      x={processElements[process].x}
                      y={processElements[process].y}
                      name={process}
                      processID={processFiltered.process_id}
                    ></Process>
                  );
                  arrowElements.push(
                    <Arrow
                      x={stateElements[filteredState.state].x}
                      y={stateElements[filteredState.state].y}
                      points={[
                        0 + arrowOffset.xState,
                        0 + arrowOffset.yState,
                        processElements[process].x -
                          stateElements[filteredState.state].x -
                          arrowOffset.xProcess,
                        processElements[process].y -
                          stateElements[filteredState.state].y -
                          arrowOffset.yProcess,
                      ]}
                      stroke={colors.dark}
                      tension={0}
                      pointerLength={20}
                      pointerWidth={20}
                      fill={colors.dark}
                    />
                  );
                  i -= 1;
                  var processFiltered = processData.filter(
                    (processFilter) =>
                      processFilter.product_type_process_name == process
                  )[0];
                  lastProcess.push(processFiltered);
                });
              }
            });
          });

          lastState = [];
          if (lastProcess.length > 0) {
            lastProcess.forEach((process) =>
              lastState.push(process.state_onto)
            );
            lastProcess = [];
          } else {
            algorithmFinished = true;
          }
        }

        setStateArrows(arrowElements);
        setStateDiagram(printResult);
      })
      .catch((err) => err);
  }

  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const [state, setState] = useState({
    stageScale: 0.5,
    stageX: 50,
    stageY: 300,
  });
  // handle wheel and drag + drop
  function handleWheel(e) {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setState({
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  }

  const { width, height } = useWindowDimensions();

  return (
    <div className="container-fluid">
        {/**input row */}
      <div className="row">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">Process list</h5>
            <p className="card-text">Enter your process-list.</p>
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-row ">
                  <Form.Group className="mr-2 mb-0">
                    <input
                      type="text"
                      id="list"
                      defaultValue="[[1]]"
                      {...register("list", {
                        required: "required",
                        pattern: {
                          value: /\[\s*\[.*\]\s*\]/,
                          message: " nested list required",
                        },
                      })}
                    />

                    {errors.list && errors.list.type === "required" && (
                      <Alert variant="danger">This is required</Alert>
                    )}
                    {errors.list && errors.list.type === "pattern" && (
                      <Alert variant="danger">{errors.list.message}</Alert>
                    )}
                  </Form.Group>
                  <div>
                    <button
                      className="btn btn-primary flex-shrink"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/**visualisation row */}
      <div className="row">
        <div className="col-12">
          <div ref={containerRef} className="overflow-hidden">
            <Stage
              ref={stageRef}
              width={window.innerWidth - 50}
              height={window.innerHeight - 100}
              onWheel={(e) => handleWheel(e)}
              scaleX={state.stageScale}
              scaleY={state.stageScale}
              x={state.stageX}
              y={state.stageY}
              className="overflow-atuo"
              draggable={true}
              style={{ backgroundColor: "#F7F7F7" }}
            >
              <Layer>
                {stateArrows}
                {stateDiagram}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CheckProductType);
