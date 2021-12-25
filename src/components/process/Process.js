import { Stage, Layer, Rect, Circle, Group, Text, Image } from "react-konva";
import useImage from "use-image";

import IconGear from "../../assets/icons/mechanische-zahnraderWhite.svg";
import colors from "../../style/theme.module.scss";

/**
 * define konva element process for Check product type
 * @param {*} props 
 * @returns 
 */
function Process(props) {
  const x = props.x;
  const y = props.y;
  const radius = 50;

  const color = "grey";
  const name = props.name;
  const [image] = useImage(IconGear);

  return (
    <Group x={x} y={y}>
      <Circle x={0} y={0} radius={radius} fill={colors.info} />
      <Image
        image={image}
        x={-5}
        y={-radius + 8}
        width={12}
        height={12}
      ></Image>
      <Text x={-20} y={-radius + 20} text="Process" fill={colors.white}></Text>
      <Text
        x={-radius / 4 + 2}
        y={-10}
        text={props.processID}
        fontSize={30}
        fill={colors.white}
      />
      <Text
        x={-radius / 4 - 5}
        y={25}
        text={name}
        fontSize={15}
        fill={colors.white}
      />
    </Group>
  );
}

export default Process;
