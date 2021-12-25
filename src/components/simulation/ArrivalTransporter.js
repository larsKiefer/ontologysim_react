

import IconLogin from "../../assets/icons/login.svg"
import { Rect, Group, Circle, Text,Line } from '../../konva/react-konva';
import Position from "./Position";

import {Image} from "react-konva"
import useImage from 'use-image';

/**
 * konva viewing arriving of transporter
 * @param {*} props 
 * @returns 
 */
function ArrivalTransporter(props){
    
    const [image] = useImage(IconLogin);    
 

    return(
        <Group x={props.x} y={props.y}>            
            <Image image={image} width={10} height={10} x={3} y={3}></Image>
            <Text text={props.name} x={7} y={-2} fontSize={6}></Text>
        </Group>

    )
}

export default ArrivalTransporter

