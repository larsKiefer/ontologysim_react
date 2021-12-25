import React from "react";

import { Rect, Group, Circle, Text, Line } from "../../konva/react-konva";
import Position from "./Position";

import { Image } from "react-konva";
import IconQueue from "../../assets/icons/stack-of-papers.svg";
import useImage from "use-image";

//view horizontal queue, used in transporter
function QueueHorizontal(props) {
  const x = props.x;
  const y = props.y;
  var name = props.name;
  const width = 95;
  const height = 30;
  const color = "#BFBFBF";

  //if queue size is >5, view additional points
  const loadAdditionalPoints = React.useMemo(() => {
    var endPoints = [];
    if (props.queue.size > 5) {
      for (var i = 0; i < 3; i++) {
        endPoints.push(
          <Circle x={81 + i * 5} y={23} radius={2} fill="white"></Circle>
        );
      }
    }
    return endPoints;
  });

  var i2 = 0;

  //plot position
  const positions = React.useMemo(() => {
    return props.queue.positions.map((element, i) => {
      var position = props.position[element];
      return (
        <Position
          x={5 + 5 + 15 * i}
          y={23}
          handleHover={props.handleHover}
          selectedProductID={props.selectedProductID}
          handleDeselect={props.handleDeselect}
          handleSelect={props.handleSelect}
          position={position}
          product={props.product[position.product_name]}
        ></Position>
      );
    });
  }, [props.position, props.selectedProductID]);

  const [image] = useImage(IconQueue);

  return (
    <Group x={x} y={y}>
      <Rect width={width} height={height} x={0} y={0} fill={color} />
      <Image image={image} width={10} height={10} x={3} y={2}></Image>
      <Text text={name} x={15} y={3} fontSize={9}></Text>
      <Line points={[0, 14, width, 14]} stroke="black" strokeWidth={1} />
      <Text
        text={props.queue.size + "P"}
        x={width - 10}
        y={5}
        fontSize={7}
      ></Text>
      <Text
        text={
          Math.round(
            (parseFloat(props.queue.current_size) /
              parseFloat(props.queue.size)) *
              100
          ) + "%"
        }
        x={width - 30}
        y={5}
        fontSize={7}
      ></Text>

      {positions}
      {loadAdditionalPoints}
    </Group>
  );
}

export default QueueHorizontal;
