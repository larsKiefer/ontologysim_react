import React from "react";

import { Rect, Circle, Group, Text,Line } from '../../konva/react-konva';
import Queue from "./Queue";
import QueueHorizontal from "./QueueHorizontal"
import QueueVertical from "./QueueVertical";
import {Image} from "react-konva"
import IconTransporter from "../../assets/icons/truck.svg"
import IconWait from "../../assets/icons/hourglass.svg"
import IconSetUp from "../../assets/icons/exchange.svg"
import IconRepair from "../../assets/icons/automobile-with-wrench.svg"
import IconMove from "../../assets/icons/move.svg"
import IconReload from "../../assets/icons/reload.svg"
import IconDefect from "../../assets/icons/removeRed.svg"
import IconThinking from "../../assets/icons/thinking.svg"

import useImage from 'use-image';

//konva view transporter
function Transporter(props){

    const x=props.x
    const y=props.y

    const radius = 6
    const width = 100
    const height = 75
    var color = "#879299"

    const [image] = useImage(IconTransporter);
    const [imageWait] = useImage(IconWait)
    const [imageMove] = useImage(IconMove)
    const [imageRepair] = useImage(IconRepair)
    const [imageReload] = useImage(IconReload)
    const [imageDefect] = useImage(IconDefect)
    const [imageThinking] = useImage(IconThinking)
  
    //view state
    var timeDiff = ""
    var stateTransporter = ""
    var stateIcon=[]
    if(Object.keys(props.status).length>0){
        if(props.status["state"] == "Wait_Transport"){
            stateTransporter = "Wait"
            stateIcon.push( 
                <Image key={"imageTransporterState"} image={imageWait} y={23} x={5} width={10} height={10}></Image> )
        }else if(props.status["state"] == "Transport"){
            stateTransporter = props.status["state"]
            stateIcon.push( 
                <Image key={"imageTransporterState"} image={imageMove} y={23} x={5} width={10} height={10}></Image> )
        }else if(props.status["state"] == "TransporterDefect"){
            stateTransporter = "Repair"
            stateIcon.push(  
                <Image key={"imageTransporterState"} image={imageRepair} y={23} x={5} width={10} height={10}></Image> )
        }else if(props.status["state"]== "Transporter"){
            stateTransporter = "Evaluation"
            stateIcon.push(  
                <Image key={"imageTransporterState"} image={imageThinking} y={23} x={5} width={10} height={10}></Image> )
        }else if(props.status["state"]=="EvTransporterDefect"){
            stateTransporter = "Defect"
            stateIcon.push(  
                <Image key={"imageTransporterState"} image={imageDefect} y={23} x={5} width={10} height={10}></Image> )
        }else if(props.status["state"]=="Change"){
            stateTransporter = "Change"
            stateIcon.push(  
                <Image key={"imageTransporterState"} image={imageReload} y={23} x={5} width={10} height={10}></Image> )
        }
        
        timeDiff = props.status["timeDiff"]
       
    }

    var time = props.time
    var kpis = props.kpi
    var name = props.name
    var queue=props.queue

    
    return(
        <Group x={x} y={y}>
            <Rect x={0} y={0} width={width} height={height} fill={color} />    
            <Text text={"AUTT: " + Math.round(props.kpi["AUTTp"]*100)+ "%"} x={width-35} y={3} fontSize={7}></Text>
            <Text text={"AUST: "+Math.round(props.kpi["AUSTp"]*100)+ "%"} x={width-35} y={10} fontSize={7}></Text>
            <Text text={name} x={25} y={5}></Text>
            <Image image={image} x={4} y={4} width={17} height={17}></Image>
            {stateIcon}
            <Text text={stateTransporter} x={15} y={25} fontSize={9}></Text>
            <Text text={"t: "+Math.round(timeDiff*10)/10} x={width-35} y={27} fontSize={7}></Text>
            <Line points= {[0,20,width,20]}   stroke='black'   strokeWidth= {1} ></Line>
            <Line points= {[0,35,width,35]}   stroke='black'   strokeWidth= {1} ></Line>             
            <QueueHorizontal x={2.5} y={40} handleHover={props.handleHover} selectedProductID={props.selectedProductID} handleDeselect={props.handleDeselect} handleSelect={props.handleSelect} queue={props.queue[props.transporter.queue]} position={props.position} product={props.product}  name={props.transporter.queue}></QueueHorizontal>
        </Group>

    )

}

export default Transporter;