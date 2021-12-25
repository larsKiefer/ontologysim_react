import React from "react";

import { Rect, Group, Circle, Text, Line } from "../../konva/react-konva";
import Position from "./Position";

import { Image } from "react-konva";
import IconQueue from "../../assets/icons/stack-of-papers.svg";
import useImage from "use-image";
import PositionTransporter from "./PositionTransporter";
import ExitTransporter from "./ExitTransporter";
import ArrivalTransporter from "./ArrivalTransporter";

//view vertical queue
function QueueVertical(props) {
  const x = props.x;
  const y = props.y;
  var name = props.name;
  const size = props.queue.size;
  const currentSize = props.queue.current_size;

  const width = 35;
  const height = 100;
  const color = "#BFBFBF";

  const postionList = [];
  var i2 = 0;

  //if queue size is >5, view additional points
  const loadAdditionalPoints = React.useMemo(() => {
    var endPoints = [];
    if (props.queue.size > 5) {
      for (var i = 0; i < 3; i++) {
        endPoints.push(
          <Circle x={21 + i * 5} y={92} radius={2} fill="white"></Circle>
        );
      }
    }
    return endPoints;
  });

  //plot position
  const positions = React.useMemo(() => {
    var i2 = 0;

    return props.queue.positions.map((element, i) => {
      var position = props.position[element];

      if (i % 2 == 0) {
        return (
          <Position
            handleHover={props.handleHover}
            selectedProductID={props.selectedProductID}
            handleDeselect={props.handleDeselect}
            handleSelect={props.handleSelect}
            x={8}
            y={30 + 15 * i2}
            position={position}
            product={props.product[position.product_name]}
          ></Position>
        );
      } else if (i % 2 == 1) {
        var positionStyle = (
          <Position
            x={25}
            y={30 + 15 * i2}
            handleHover={props.handleHover}
            selectedProductID={props.selectedProductID}
            handleDeselect={props.handleDeselect}
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

  const [image] = useImage(IconQueue);

  return (
    <Group x={x} y={y}>
      {props.transporter && transporterLocation}
      <Rect x={0} y={0} height={height} width={width} fill={color} />
      <Text text={name} x={15} y={2} fontSize={9} />
      <Image image={image} width={10} height={10} x={3} y={2}></Image>
      {/*<Text text="P2" x={2} y={10} fontSize={5} />
            <Text text="13" x={2} y={15} fontSize={5} />  */}
      <Text text={size + "P"} x={2} y={15} fontSize={7}></Text>
      <Text
        text={
          Math.round((parseFloat(currentSize) / parseFloat(size)) * 100) + "%"
        }
        x={width - 17}
        y={15}
        fontSize={7}
      ></Text>
      <Line points={[0, 13, width, 13]} stroke="black" strokeWidth={1}></Line>
      {/*<Text text="P213" x={0} y={12.5} fontSize={5} /> */}

      {positions}
      {loadAdditionalPoints}
    </Group>
  );
}

export default QueueVertical;
