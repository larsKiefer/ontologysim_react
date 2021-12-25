import { Stage, Layer, Rect, Circle, Group, Text, Image } from "react-konva";

import useImage from "use-image";

import IconNut from "../../assets/icons/screwWhite.svg";

import colors from "../../style/theme.module.scss";

/**
 * define konva element state for Check product type
 * @param {*} props
 * @returns
 */
function State(props) {
  const x = props.x;
  const y = props.y;
  const width = 100;
  const height = 100;
  const name = props.name;

  const [image] = useImage(IconNut);

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas

    <Group x={x} y={y}>
      <Rect x={0} y={0} width={width} height={height} fill={colors.primary} />
      <Image image={image} x={5} y={2} width={10} height={10}></Image>
      <Text x={20} y={3} text="State" fill={colors.white}></Text>
      <Text
        x={width / 2 - 10}
        y={height / 2 - 10}
        fontSize={20}
        text={name}
        fontSize={30}
        fill={colors.white}
      />
    </Group>
  );
}

export default State;
