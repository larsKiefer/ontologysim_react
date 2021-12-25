import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stage, Layer, Rect, Group, Circle } from "../../konva/react-konva";

import useWindowDimensions from "../useWindowDimensions";
import ArrivalTransporter from "./ArrivalTransporter";
import ExitTransporter from "./ExitTransporter";
import Machine from "./Machine";
import PositionTransporter from "./PositionTransporter";
import Queue from "./Queue";
import QueueHorizontal from "./QueueVertical";
import Transporter from "./Transporter";
import ProductPopup from "./ProductPopup";

import { TiDelete } from "react-icons/ti";
import { BiMenu } from "react-icons/bi";

import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import ProductWindow from "./ProductWindow";
import LegendSimulation from "./LegendSimulation";
import QueueEnd from "./QueueEnd";
import ProductTypePopup from "./ProductTypePopup";

/**
 * main class for viewing production
 * @param {*} props 
 * @returns 
 */
function Production(props) {
  const { height, width } = useWindowDimensions();
  const sidebar = useSelector((state) => state.sidebar);

  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const [productID, setProductID] = React.useState(null);
  const [openWindow, setOpenWindow] = React.useState(true);
  const [popup, setPopup] = React.useState({ productID: null });
  const [popupProductType, setPopupProductType] = React.useState({
    productTypeId: null,
  });
  const [legend, setLegend] = React.useState(false);

  const handleHover = React.useCallback((productID, pos) => {
    setPopup({ productID: productID, position: pos });
  }, []);

  const handleHoverProductTpye = React.useCallback((productTypeId, pos) => {
    setPopupProductType({ productTypeId: productTypeId, position: pos });
  }, []);

  //select and deselect of objects
  const handleSelect = React.useCallback(
    (productID) => {
      setProductID(productID);
    },
    [productID]
  );

  const handleDeselect = React.useCallback(
    (productID) => {
      setProductID(null);
    },
    [productID]
  );

  const [state, setState] = useState({
    stageScale: 1,
    stageX: 200,
    stageY: 200,
  });

  const [dimension, setDimension] = useState(null);

  useEffect(() => {
    setDimension({
      width: containerRef.current.clientWidth - 80,
      height: height - containerRef.current.offsetTop,
    });
  }, [containerRef, width, height, sidebar.active]);

  //handle state change
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

  //generate all objects for konva
  const konvaObjects = React.useMemo(() => {
    if (!props.data) {
      return { machine: undefined, queue: undefined, transporter: undefined };
    } else {
      if (Object.entries(props.data).length == 0) {
        return { machine: undefined, queue: undefined, transporter: undefined };
      } else {
        var data = props.data;
        var deadlockQueue = data["DeadlockQueue"];
        var endQueue = data["EndQueue"];
        var machineQueue = data["MachineQueue"];
        var processQueue = data["ProcessQueue"];
        var startQueue = data["StartQueue"];
        var position = data["Position"];
        var product = data["Product"];
        var productType = data["ProductType"];
        const task = data["Task"];

        var transporterQueue = data["TransporterQueue"];
        var xMachine = 0;
        var yMachine = 0;
        var xTransporter = -150;
        var yTransporter = 0;

        var machineList = [];
        var transporterList = [];
        var addedQueues = [];
        var queueList = [];
        var xQueue = 0;
        var yQueue = -100;
        var i = 0;

        const lengthProductType = Object.keys(productType).length;

        var horizontalNumber = Math.round(
          Math.sqrt(Object.entries(data["Machine"]).length)
        );

        //transporter
        const transporterLocation = {};
        for (const [key, value] of Object.entries(data["Transporter"])) {
          var queueTransporter = {};
          var positionTransporter = {};
          var productTransporter = {};
          var productTpyeTransporter = {};

          queueTransporter[value.queue] = transporterQueue[value.queue];

          queueTransporter[value.queue].positions.forEach((element) => {
            positionTransporter[element] = position[element];
            if (position[element].product_name != "") {
              productTransporter[position[element].product_name] =
                product[position[element].product_name];
              if (
                productTransporter[position[element].product_name].product_type
              ) {
                var nameProductType =
                  productTransporter[position[element].product_name]
                    .product_type;
                productTpyeTransporter[nameProductType] =
                  productType[nameProductType];
              }
            }
          });

          if (value["state"]) {
            if (value["state"]["state"] == "Transport") {
              if (!transporterLocation[value.state.newLocation]) {
                transporterLocation[value.state.newLocation] = [
                  { type: "arrive", name: key },
                ];
              } else {
                transporterLocation[value.state.newLocation].push({
                  type: "arrive",
                  name: key,
                });
              }
              if (!transporterLocation[value.state.oldLocation]) {
                transporterLocation[value.state.oldLocation] = [
                  { type: "exit", name: key },
                ];
              } else {
                transporterLocation[value.state.oldLocation].push({
                  type: "exit",
                  name: key,
                });
              }
            } else {
              if (!transporterLocation[value.location.queue]) {
                transporterLocation[value.location.queue] = [
                  { type: "current", name: key },
                ];
              } else {
                transporterLocation[value.location.queue].push({
                  type: "current",
                  name: key,
                });
              }
            }
          } else {
            if (!transporterLocation[value.location.queue]) {
              transporterLocation[value.location.queue] = [
                { type: "current", name: key },
              ];
            } else {
              transporterLocation[value.location.queue].push({
                type: "current",
                name: key,
              });
            }
          }

          var kpiData = value["kpi"];
          if (kpiData == undefined) {
            kpiData = { AUTTp: 0, AUSTp: 0 };
          }

          transporterList.push(
            <Transporter
              name={key}
              handleHover={handleHover}
              selectedProductID={productID}
              handleSelect={handleSelect}
              handleDeselect={handleDeselect}
              transporter={value}
              queue={queueTransporter}
              product={productTransporter}
              position={positionTransporter}
              x={xTransporter}
              y={yTransporter}
              kpi={kpiData}
              status={value["state"]}
            ></Transporter>
          );
          yTransporter += 110;
        }

        //machine
        for (const [key, value] of Object.entries(data["Machine"])) {
          var queueData = {
            input_queue: {},
            output_queue: {},
            process_queue: {},
          };
          var positionData = {};
          var productData = {};
          var productTypeData = {};
          var machineQueueList = [];
          var transporterData = {};

          value["input_queue"].forEach((inputQueue) => {
            if (!addedQueues.includes(inputQueue)) {
              queueData["input_queue"][inputQueue] = machineQueue[inputQueue];
              addedQueues.push(inputQueue);

              queueData["input_queue"][inputQueue].positions.forEach(
                (element) => {
                  positionData[element] = position[element];
                  if (position[element].product_name != "") {
                    productData[position[element].product_name] =
                      product[position[element].product_name];
                    if (
                      productData[position[element].product_name].product_type
                    ) {
                      var nameProductType =
                        productData[position[element].product_name]
                          .product_type;
                      productTypeData[nameProductType] =
                        productType[nameProductType];
                    }
                  }
                }
              );

              transporterData[inputQueue] = transporterLocation[inputQueue];
            }
            machineQueueList.push(inputQueue);
          });

          //machine output queue
          value["output_queue"].forEach((outputQueue) => {
            if (!addedQueues.includes(outputQueue)) {
              queueData["output_queue"][outputQueue] =
                machineQueue[outputQueue];
              addedQueues.push(outputQueue);

              queueData["output_queue"][outputQueue].positions.forEach(
                (element) => {
                  positionData[element] = position[element];
                  if (position[element].product_name != "") {
                    productData[position[element].product_name] =
                      product[position[element].product_name];
                    if (
                      productData[position[element].product_name].product_type
                    ) {
                      var nameProductType =
                        productData[position[element].product_name]
                          .product_type;
                      productTypeData[nameProductType] =
                        productType[nameProductType];
                    }
                  }
                }
              );

              transporterData[outputQueue] = transporterLocation[outputQueue];
            }
            machineQueueList.push(outputQueue);
          });

          //machine process queue
          value["process_queue"].forEach((processQueue1) => {
            queueData["process_queue"][processQueue1] =
              processQueue[processQueue1];
            queueData["process_queue"][processQueue1].positions.forEach(
              (element) => {
                positionData[element] = position[element];
                if (position[element].product_name != "") {
                  productData[position[element].product_name] =
                    product[position[element].product_name];
                  if (
                    productData[position[element].product_name].product_type
                  ) {
                    var nameProductType =
                      productData[position[element].product_name].product_type;
                    productTypeData[nameProductType] =
                      productType[nameProductType];
                  }
                }
              }
            );
          });
          var kpiData = value["kpi"];
          if (kpiData == undefined) {
            kpiData = { APTp: 0, ASTp: 0 };
          }

          machineList.push(
            <Machine
              name={key}
              handleHover={handleHover}
              handleSelect={handleSelect}
              selectedProductID={productID}
              handleDeselect={handleDeselect}
              queueList={machineQueueList}
              transporter={transporterData}
              queue={queueData}
              position={positionData}
              product={productData}
              x={xMachine}
              y={yMachine}
              kpi={kpiData}
              status={value["state"]}
              lastProcess={value["last_process"]}
            ></Machine>
          );

          if (i % horizontalNumber == horizontalNumber - 1) {
            xMachine = 0;
            yMachine += 150;
          } else {
            xMachine = xMachine + 100 + machineQueueList.length * 40 + 10;
          }
          i += 1;
        }
        
        //start queue
        for (const [key, value] of Object.entries(data["StartQueue"])) {
          var positionData = {};
          var productData = {};
          var productTypeData = {};
          value.positions.forEach((element) => {
            positionData[element] = position[element];
            if (position[element].product_name != "") {
              productData[position[element].product_name] =
                product[position[element].product_name];
              if (productData[position[element].product_name].product_type) {
                var nameProductType =
                  productData[position[element].product_name].product_type;
                productTypeData[nameProductType] = productType[nameProductType];
              }
            }
          });

          queueList.push(
            <Queue
              x={xQueue}
              y={yQueue}
              handleHover={handleHover}
              handleSelect={handleSelect}
              selectedProductID={productID}
              handleDeselect={handleDeselect}
              queue={value}
              position={positionData}
              product={productData}
              transporter={transporterLocation[key]}
              name={key}
            ></Queue>
          );
          xQueue += 100;
        }

        //Deadlock queue
        for (const [key, value] of Object.entries(data["DeadlockQueue"])) {
          var positionData = {};
          var productData = {};
          var productTypeData = {};
          value.positions.forEach((element) => {
            positionData[element] = position[element];
            if (position[element].product_name != "") {
              productData[position[element].product_name] =
                product[position[element].product_name];
              if (productData[position[element].product_name].product_type) {
                var nameProductType =
                  productData[position[element].product_name].product_type;
                productTypeData[nameProductType] = productType[nameProductType];
              }
            }
          });

          queueList.push(
            <Queue
              x={xQueue}
              y={yQueue}
              handleHover={handleHover}
              handleSelect={handleSelect}
              selectedProductID={productID}
              handleDeselect={handleDeselect}
              queue={value}
              position={positionData}
              product={productData}
              transporter={transporterLocation[key]}
              name={key}
            ></Queue>
          );
          xQueue += 100;
        }

        //End queue
        for (const [key, value] of Object.entries(data["EndQueue"])) {
          queueList.push(
            <QueueEnd
              x={xQueue}
              y={yQueue}
              handleHover={handleHoverProductTpye}
              productType={productType}
              task={task}
              transporter={transporterLocation[key]}
              name={key}
            ></QueueEnd>
          );

          xQueue += 120;
        }

        return {
          machine: machineList,
          queue: queueList,
          transporter: transporterList,
        };
      }
    }
  }, [props.data, productID]);

  // additional data (position)
  const windowOpener = React.useMemo(() => {
    if (!openWindow) {
      return (
        <div
          style={{
            position: "absolute",
            bottom: 15 + "px",
            left: width - 50 + "px",
            zIndex: 30,
          }}
        >
          <FiMaximize2
            className=""
            type="button"
            onClick={() => setOpenWindow(true)}
          ></FiMaximize2>
        </div>
      );
    }
  }, [width, openWindow]);

  //get data product info
  const productInfo = React.useMemo(() => {
    if (width > 400 && productID != null && openWindow) {
      return (
        <ProductWindow
          windowClick={() => {
            setProductID(null);
          }}
          closeClick={() => {
            setOpenWindow(false);
          }}
          productID={productID}
          data={props.data["Product"][productID]}
          height={height}
          width={width}
        ></ProductWindow>
      );
    }
  }, [width, productID, openWindow]);

  //legend button --> activate legend
  const legendButton = React.useMemo(() => {
    if (dimension != null) {
      return (
        <div
          className=""
          style={{
            position: "relative",
            bottom: dimension.height + "px",
            left: dimension.width / 2 + "px",
            zIndex: 10,
          }}
        >
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setLegend(true)}
          >
            <BiMenu></BiMenu> Legend
          </button>
        </div>
      );
    }
  }, [dimension, width]);

  //define legend
  const legendWindow = React.useMemo(() => {
    if (legend && dimension != null) {
      return (
        <div
          className=""
          style={{
            position: "relative",
            bottom: dimension.height + 32 + "px",
            left: dimension.width - 170 + "px",
            zIndex: 15,
            width: 250,
          }}
        >
          <LegendSimulation
            closeLegend={() => setLegend(false)}
          ></LegendSimulation>
        </div>
      );
    }
  }, [dimension, width, legend]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {dimension != null && (
        <Stage
          ref={stageRef}
          width={dimension.width}
          height={dimension.height}
          onWheel={(e) => handleWheel(e)}
          scaleX={state.stageScale}
          scaleY={state.stageScale}
          x={state.stageX}
          y={state.stageY}
          className="overflow-atuo"
          draggable={true}
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <Layer>{konvaObjects.machine}</Layer>
          <Layer>{konvaObjects.transporter}</Layer>
          <Layer>{konvaObjects.queue}</Layer>
        </Stage>
      )}
      {legendButton}
      {legendWindow}

      {popup.productID && (
        <ProductPopup
          position={popup.position}
          product={props.data["Product"][popup.productID]}
          name={popup.productID}
          onClose={() => {
            setPopup({ productID: null });
          }}
        />
      )}

      {popupProductType.productTypeId && (
        <ProductTypePopup
          position={popupProductType.position}
          productTypeName={popupProductType.productTypeId}
        ></ProductTypePopup>
      )}

      {productInfo}
      {windowOpener}
    </div>
  );
}

export default Production;
