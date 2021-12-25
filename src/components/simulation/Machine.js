import React from "react";

//import { Rect, Group, Text } from '../../konva/react-konva';
import {
  Stage,
  Group,
  Text,
  Rect,
  Image,
  Line,
  Layer,
} from "../../konva/react-konva";
import Queue from "./Queue";
import QueueHorizontal from "./QueueHorizontal";
import QueueVertical from "./QueueVertical";

import IconProcess from "../../assets/icons/engineering.svg";
import IconHistory from "../../assets/icons/history.svg";
import IconMachine from "../../assets/icons/tools.svg";
import IconQueue from "../../assets/icons/stack-of-papers.svg";
import IconWait from "../../assets/icons/hourglass.svg";
import IconSetUp from "../../assets/icons/exchange.svg";
import IconRepair from "../../assets/icons/automobile-with-wrench.svg";
import IconReload from "../../assets/icons/reload.svg";
import IconDefect from "../../assets/icons/removeRed.svg";
import IconThinking from "../../assets/icons/thinking.svg";

import useImage from "use-image";
import Position from "./Position";

/**
 * konva machine
 * @param {*} props
 * @returns
 */
function Machine(props) {
  const [image] = useImage(IconProcess);
  const [imageHistory] = useImage(IconHistory);
  const [imageMachine] = useImage(IconMachine);
  const [imageQueue] = useImage(IconQueue);
  const [imageWait] = useImage(IconWait);
  const [imageSetUp] = useImage(IconSetUp);
  const [imageRepair] = useImage(IconRepair);
  const [imageReload] = useImage(IconReload);
  const [imageDefect] = useImage(IconDefect);
  const [imageThinking] = useImage(IconThinking);

  const x = props.x;
  const y = props.y;
  const kpi = props.kpi;

  var name = props.name;
  const queue = props.queue;

  //state
  var timeDiff = "";
  var stateMachine = "";
  var stateIcon = [];
  if (Object.keys(props.status).length > 0) {
    if (props.status["state"] == "Wait_Machine") {
      stateMachine = "Wait";
      stateIcon.push(
        <Image image={imageWait} y={23} x={5} width={10} height={10}></Image>
      );
    } else if (props.status["state"] == "SetUp") {
      stateMachine = props.status["state"];
      stateIcon.push(
        <Image image={imageSetUp} y={23} x={5} width={10} height={10}></Image>
      );
    } else if (props.status["state"] == "MachineDefect") {
      stateMachine = "Defect";
      stateIcon.push(
        <Image image={imageRepair} y={23} x={5} width={10} height={10}></Image>
      );
    } else if (props.status["state"] == "Process") {
      stateMachine = "Process";
      stateIcon.push(
        <Image image={image} y={23} x={5} width={10} height={10}></Image>
      );
    } else if (props.status["state"] == "Machine") {
      stateMachine = "Evaluation";
      stateIcon.push(
        <Image
          image={imageThinking}
          y={23}
          x={5}
          width={10}
          height={10}
        ></Image>
      );
    } else if (props.status["state"] == "EvMachineDefect") {
      stateMachine = "Defect";
      stateIcon.push(
        <Image image={imageDefect} y={23} x={5} width={10} height={10}></Image>
      );
    } else if (props.status["state"] == "Change") {
      stateMachine = "Change";
      stateIcon.push(
        <Image image={imageReload} y={23} x={5} width={10} height={10}></Image>
      );
    }

    timeDiff = props.status["timeDiff"];
  }

  //queue
  var queueNames = "";
  props.queueList.forEach(
    (element) => (queueNames = queueNames + element + ", ")
  );
  var queueList = [];
  const width = 100;
  const height = 100;

  var inputQueueX = -40;
  var outputQueueX = width + 5;

  for (const [key, value] of Object.entries(queue["output_queue"])) {
    queueList.push(
      <QueueVertical
        key={"outputQueue" + key}
        x={outputQueueX}
        y={0}
        handleDeselect={props.handleDeselect}
        selectedProductID={props.selectedProductID}
        handleSelect={props.handleSelect}
        transporter={props.transporter[key]}
        queue={value}
        position={props.position}
        product={props.product}
        name={key}
      ></QueueVertical>
    );

    outputQueueX += 50;
  }
  for (const [key, value] of Object.entries(queue["input_queue"])) {
    queueList.push(
      <QueueVertical
        key={"inputQueue" + key}
        x={inputQueueX}
        y={0}
        handleHover={props.handleHover}
        selectedProductID={props.selectedProductID}
        handleDeselect={props.handleDeselect}
        handleSelect={props.handleSelect}
        transporter={props.transporter[key]}
        queue={value}
        position={props.position}
        product={props.product}
        name={key}
      ></QueueVertical>
    );
    inputQueueX -= 50;
  }

  // view process and process position
  const processLine = React.useMemo(() => {
    var positionName = "";

    for (const [key, value] of Object.entries(queue["process_queue"])) {
      value.positions.forEach((element) => {
        positionName = element;
      });
    }
    var position = props.position[positionName];
    var product = props.product[props.position[positionName].product_name];

    return (
      <Group>
        <Position
          x={10}
          y={45}
          position={position}
          product={product}
          handleHover={props.handleHover}
          selectedProductID={props.selectedProductID}
          handleDeselect={props.handleDeselect}
          handleSelect={props.handleSelect}
        ></Position>
        {position.product_name != "" && position.blockedSpace == 1 && (
          <Text
            text={position.product_name + ": " + product.state}
            x={20}
            y={40}
            fontSize={10}
          ></Text>
        )}
      </Group>
    );
  }, [queue["process_queue"]]);

  return (
    <Group x={x} y={y}>
      <Rect x={0} y={0} width={100} height={100} fill="#DFDFDF" />
      <Text
        text={"APT: " + Math.round(props.kpi["APTp"] * 100) + "%"}
        x={width - 35}
        y={3}
        fontSize={7}
      ></Text>
      <Text
        text={"AST: " + Math.round(props.kpi["ASTp"] * 100) + "%"}
        x={width - 35}
        y={10}
        fontSize={7}
      ></Text>
      <Text text={name} x={17} y={5}></Text>
      <Image image={imageMachine} y={4} x={4} width={12} height={12}></Image>
      {stateIcon}
      <Text text={stateMachine} x={15} y={25} fontSize={9}></Text>
      <Text
        text={"t: " + Math.round(timeDiff * 10) / 10}
        x={width - 35}
        y={27}
        fontSize={7}
      ></Text>
      <Line points={[0, 20, width, 20]} stroke="black" strokeWidth={1}></Line>
      <Line points={[0, 35, width, 35]} stroke="black" strokeWidth={1}></Line>
      {processLine}
      <Text
        text={
          props.status.process != undefined
            ? "Process:" + props.status.process
            : "Process: -"
        }
        x={20}
        y={55}
        fontSize={10}
      ></Text>
      <Text
        text={
          props.lastProcess != undefined
            ? "Last Process: " + props.lastProcess
            : "Last Process: -"
        }
        x={20}
        y={65}
        fontSize={10}
      ></Text>
      <Text text={queueNames} x={20} y={85} fontSize={10}></Text>
      {queueList}

      <Image image={image} y={55} x={5} width={10} height={10}></Image>
      <Image image={imageHistory} y={65} x={5} width={10} height={10}></Image>
      <Image image={imageQueue} y={85} x={5} width={10} height={10}></Image>
    </Group>
  );
}

export default Machine;
