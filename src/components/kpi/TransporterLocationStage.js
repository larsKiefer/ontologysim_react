import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "../useWindowDimensions";
import IconLocation from "../../assets/icons/location-pointer-white.svg";
import {
  Stage,
  Layer,
  Rect,
  Group,
  Circle,
  Text,
  Image,
  Arc,
} from "../../konva/react-konva";
import colors from "../../style/theme.module.scss";
import useImage from "use-image";

/**
 * konva visualisation for showing, where the transporter location distribution is shown
 * @param {*} props 
 * @returns 
 */
function TransporterLocationStage(props) {
  const { height, width } = useWindowDimensions();
  const sidebar = useSelector((state) => state.sidebar);
  const colorList = [
    colors.danger,
    colors.dark,
    colors.info,
    colors.warning,
    colors.secondary,
  ];

  const [image] = useImage(IconLocation);
  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const [state, setState] = useState({
    stageScale: 1,
    stageX: 200,
    stageY: 200,
  });

  const [dimension, setDimension] = useState(null);

  useEffect(() => {
    console.log(containerRef);
    setDimension({
      width: containerRef.current.clientWidth,
      height: 500,
    });
  }, [containerRef, width, height, sidebar.active]);

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

  /**
   * view loaction and the distribution percentage
   */
  const locationList = React.useMemo(() => {
    if (Object.entries(props.data).length != 0) {
      var transporterList = [];
      Object.keys(props.data).forEach((element) => {
        if (element != "all") {
          transporterList.push(element);
        }
      });
      console.log(transporterList);

      return Object.entries(props.data["all"]).map(([key, value], i) => {
        var sum = 0;
        transporterList.map((element) => {
          sum += Math.round(props.data[element][key] * 1000) / 1000;
        });
        var arcList = [];
        var lastAngleValue = 0;
        if (sum > 0) {
          arcList = transporterList.map((element, i2) => {
            var addValue = (props.data[element][key] / sum) * 360;
            lastAngleValue += addValue;
            return (
              <Arc
                innerRadius={20}
                outerRadius={20 + 20 * value}
                angle={addValue}
                rotation={lastAngleValue - addValue}
                fill={colorList[i2 % colorList.length]}
              ></Arc>
            );
          });
        }
        var x = 0;
        var y = 0;
        if (i % 2 == 0) {
          x = 50 * i;
          y = 100;
        } else {
          x = 50 * (i - 1);
          y = 100 + 100;
        }
        return (
          <Group x={x} y={y}>
            {arcList}
            <Circle x={0} y={0} radius={20} fill={colors.primary}></Circle>
            <Group>
              <Image
                image={image}
                x={-5}
                y={-15}
                width={12}
                height={12}
              ></Image>
            </Group>
            <Text x={-5} y={2} text={key} fill={colors.white}></Text>
          </Group>
        );
      });
    }
  }, [props.data]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-100"
      style={{ height: "500px" }}
    >
      {dimension != null && (
        <Stage
          ref={stageRef}
          width={dimension.width}
          height={500}
          onWheel={(e) => handleWheel(e)}
          scaleX={state.stageScale}
          scaleY={state.stageScale}
          x={state.stageX}
          y={state.stageY}
          className="overflow-atuo"
          draggable={true}
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <Layer>{locationList}</Layer>
        </Stage>
      )}
    </div>
  );
}

export default TransporterLocationStage;
