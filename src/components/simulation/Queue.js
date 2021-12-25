import React from "react";

import {
  Rect,
  Group,
  Circle,
  Text,
  Line,
  Image,
} from "../../konva/react-konva";
import Position from "./Position";

import IconQueue from "../../assets/icons/stack-of-papers.svg";
import useImage from "use-image";
import ArrivalTransporter from "./ArrivalTransporter";
import PositionTransporter from "./PositionTransporter";
import ExitTransporter from "./ExitTransporter";

//view standard square queue
function Queue(props) {
  const x = props.x;
  const y = props.y;
  var name = props.name;

  var firstPartName = "";
  var secondPartName = "";
  if (name.length > 5) {
    var res = name.split("_");
    firstPartName = res[0];
    secondPartName = res[1];
  }

  const width = 50;
  const height = 50;
  const color = "#BFBFBF";

  const postionList = [];

  //plot position
  const positions = React.useMemo(() => {
    var i2 = 0;
    return props.queue.positions.map((element, i) => {
      var position = props.position[element];
      if (i % 3 == 0) {
        return (
          <Position
            x={5 + 5}
            y={27 + 15 * i2}
            handleHover={props.handleHover}
            handleDeselect={props.handleDeselect}
            selectedProductID={props.selectedProductID}
            handleSelect={props.handleSelect}
            position={position}
            product={props.product[position.product_name]}
          ></Position>
        );
      } else if (i % 3 == 1) {
        return (
          <Position
            x={5 + 20}
            y={27 + 15 * i2}
            handleHover={props.handleHover}
            handleDeselect={props.handleDeselect}
            selectedProductID={props.selectedProductID}
            handleSelect={props.handleSelect}
            position={position}
            product={props.product[position.product_name]}
          ></Position>
        );
      } else {
        var positionStyle = (
          <Position
            x={5 + 35}
            y={27 + 15 * i2}
            handleHover={props.handleHover}
            handleDeselect={props.handleDeselect}
            selectedProductID={props.selectedProductID}
            handleSelect={props.handleSelect}
            position={position}
            product={props.product[position.product_name]}
          ></Position>
        );
        i2 += 1;
        return positionStyle;
      }
    });
  }, [props.position, props.selectedProductID,props.handleHover]);

  const [image] = useImage(IconQueue);

  //if queue size is >5, view additional points
  const loadAdditionalPoints = React.useMemo(() => {
    var endPoints = [];
    if (props.queue.size > 5) {
      for (var i = 0; i < 3; i++) {
        endPoints.push(
          <Circle
            x={36 + 5 * i}
            y={25 + 17 * 1}
            radius={2}
            fill="white"
          ></Circle>
        );
      }
    }
    return endPoints;
  });

  //define transporter loaction 
  const transporterLocation = React.useMemo(() => {
    if (props.transporter) {
      return props.transporter.map((element, i) => {
        if (element.type == "current") {
          return (
            <PositionTransporter
              y={-12}
              x={0 + 10 * i}
              name={element.name}
            ></PositionTransporter>
          );
        } else if (element.type == "exit") {
          return (
            <ExitTransporter
              y={-12}
              x={0 + 10 * i}
              name={element.name}
            ></ExitTransporter>
          );
        } else if ((element.type = "arrive")) {
          return (
            <ArrivalTransporter
              y={-12}
              x={0 + 10 * i}
              name={element.name}
            ></ArrivalTransporter>
          );
        }
      });
    }
  }, [props.transporter]);

  const size = props.queue.size;
  const currentSize = props.queue.current_size;

  return (
    <Group x={x} y={y}>
      {props.transporter && transporterLocation}
      <Rect width={width} height={height} x={0} y={0} fill={color} />
      <Image image={image} width={10} height={10} x={3} y={3}></Image>
      {firstPartName == "" ? (
        <Text text={name} x={15} y={4} fontSize={9}></Text>
      ) : (
        <Group>
          <Text text={firstPartName} x={15} y={2} fontSize={6}></Text>
          <Text text={secondPartName} x={15} y={8} fontSize={6}></Text>
        </Group>
      )}

      <Line points={[0, 17, width, 17]} stroke="black" strokeWidth={1} />
      <Text text={size + "P"} x={width - 10} y={2} fontSize={7}></Text>
      {(parseFloat(currentSize) / parseFloat(size)) * 100 > 10 ? (
        <Text
          text={
            Math.round((parseFloat(currentSize) / parseFloat(size)) * 100) + "%"
          }
          x={width - 15}
          y={10}
          fontSize={7}
        ></Text>
      ) : (
        <Text
          text={
            Math.round((parseFloat(currentSize) / parseFloat(size)) * 100) + "%"
          }
          x={width - 10}
          y={10}
          fontSize={7}
        ></Text>
      )}

      {positions}
      {loadAdditionalPoints}
    </Group>
  );
}

export default Queue;
