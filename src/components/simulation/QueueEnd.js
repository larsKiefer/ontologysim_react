import React from "react";

import { Rect, Group, Circle, Text, Line } from "../../konva/react-konva";
import Position from "./Position";

import { Image } from "react-konva";
import IconQueue from "../../assets/icons/stack-of-papers.svg";
import useImage from "use-image";
import ArrivalTransporter from "./ArrivalTransporter";
import PositionTransporter from "./PositionTransporter";
import ExitTransporter from "./ExitTransporter";

//view square end queue
function QueueEnd(props) {
  const colors = ["blue", "green", "orange"];
  const lightColors = ["lightblue", "lightgreen", "lightorange"];
  const x = props.x;
  const y = props.y;
  const radius = 6;
  var name = props.name;

  var firstPartName = "";
  var secondPartName = "";
  if (name.length > 5) {
    var res = name.split("_");
    firstPartName = res[0];
    secondPartName = res[1];
  }

  const width = 75;
  const height = 50;
  const bgColor = "#BFBFBF";

  //view product type in position design
  const positions = React.useMemo(() => {
    var i2 = 0;
    var i3 = 0;

    return Object.keys(props.productType).map((key, i) => {
      var productTypeName = key;
      var numberProductType = productTypeName.replace(/^\D+/g, "");
      var color = colors[numberProductType % colors.length];
      var partNumber = 0;
      Object.entries(props.task).forEach(([task, taskValue]) => {
        if (key == taskValue.product_type) {
          partNumber += taskValue.number - taskValue.todo_number;
        }
      });

      if (i % 2 == 0 && i > 0) {
        i2 += 1;
      }
      if (i % 2 == 1 && i > 0) {
        i3 = 1;
      } else {
        i3 = 0;
      }

      return (
        <Group
          x={5 + 5 + 37 * i3}
          y={27 + 15 * i2}
          onMouseEnter={(e) => {
            e.target._clearCache();

            const container = e.target.getStage().container();

            props.handleHover(key, e.target.getAbsolutePosition());
            container.style.cursor = "pointer";
          }}
          onMouseLeave={(e) => {
            props.handleHover(null);
            const container = e.target.getStage().container();
            container.style.cursor = "";
          }}
        >
          <Circle
            radius={radius}
            x={0}
            y={0}
            fill={color}
            strokeWidth={2}
            stroke={color}
          ></Circle>
          <Text text={partNumber} x={10} y={-4} fontSize={8}></Text>
        </Group>
      );
    });
  }, [props.productType, props.task]);

  const [image] = useImage(IconQueue);

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

  return (
    <Group x={x} y={y}>
      {props.transporter && transporterLocation}
      <Rect width={width} height={height} x={0} y={0} fill={bgColor} />
      <Image image={image} width={10} height={10} x={3} y={3}></Image>
      {firstPartName == "" ? (
        <Text text={name} x={15} y={4} fontSize={9}></Text>
      ) : (
        <Group>
          <Text text={firstPartName} x={15} y={2} fontSize={6}></Text>
          <Text text={secondPartName} x={15} y={8} fontSize={6}></Text>
        </Group>
      )}
      <Text
        text={"finished products"}
        x={width - 40}
        y={11}
        fontSize={5}
      ></Text>

      <Line points={[0, 17, width, 17]} stroke="black" strokeWidth={1} />
      {positions}
    </Group>
  );
}

export default QueueEnd;
