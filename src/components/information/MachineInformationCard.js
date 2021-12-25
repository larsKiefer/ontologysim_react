import { Stage,Group,Text,Rect,Image,Line,Layer,Circle,Arc } from "../../konva/react-konva"
import React, { useState } from "react"
import Position from "./Position"
import useImage from 'use-image';

import IconProcess from "../../assets/icons/engineering.svg"
import IconHistory from "../../assets/icons/history.svg"
import IconMachine from "../../assets/icons/tools.svg"
import IconQueue from "../../assets/icons/stack-of-papers.svg"
import IconWait from "../../assets/icons/hourglass.svg"
import IconSetUp from "../../assets/icons/exchange.svg"
import IconRepair from "../../assets/icons/automobile-with-wrench.svg"
import IconReload from "../../assets/icons/reload.svg"
import IconDefect from "../../assets/icons/removeRed.svg"
import IconThinking from "../../assets/icons/thinking.svg"

/**
 * information card, where the machine visualisation is described
 * @returns 
 */
function MachineInformationCard(){

    const containerRef = React.useRef(null);
    const stageRef = React.useRef(null);

    const width=100;
    const height = 100;

    const x=5
    const y=5

    const [imageProcess] = useImage(IconProcess);
    const [imageHistory] = useImage(IconHistory);
    const [imageMachine] = useImage(IconMachine);
    const [imageQueue] = useImage(IconQueue)
    const [imageWait] = useImage(IconWait)
    const [imageSetUp] = useImage(IconSetUp)
    const [imageRepair] = useImage(IconRepair)
    const [imageReload] = useImage(IconReload)
    const [imageDefect] = useImage(IconDefect)
    const [imageThinking] = useImage(IconThinking)

    const [state, setState] = useState(null)

    const handleHover = React.useCallback((type) => {
        setState(type)
      }, []);

    function onMouseEnter(e,type){
        e.target._clearCache();                                                    
        const container = e.target.getStage().container();                                                   
        handleHover(type);
        container.style.cursor = "pointer";    
        console.log("mouse enter")                                                
    }

    function onMouseLeave(e){
       
        handleHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = "";
        
    }

    // view data on the right side
    const information = React.useMemo(()=>{
        console.log(state)
        if(state ==null){
            return <p className="mb-0 ml-1 mr-1">Hover to view information</p>
        }else if(state == "Name"){
            return <p className="mb-0 ml-1 mr-1">Machine: Name</p>
        }else if(state == "KPI"){
            return  <div className="">
                        <h6>KPI</h6>
                        <p className="mb-0 ml-1 mr-1 ">KPI data of the last time intervall</p>
                        <p className="mb-0 ml-1 mr-1 "><span className="font-weight-bold" >APT:</span> Actual production time in percent</p>
                        <p className="mb-0 ml-1 mr-1 "><span className="font-weight-bold" >AST:</span> 	Actual setup time in percent</p>
                    </div>
        }else if(state == "Queue"){
            return <div className="">
                        <h6 >Queue</h6>
                        <p className="mb-0 ml-1 mr-1">All queues listed: </p>
                        <p  className="mb-0 ml-1 mr-1"> if queue name listed multiple times, it is an input, output queue</p>
                    </div>
        }else if(state == "State"){
            return <div className="">
                         <h6 >State</h6>
                        <div className="d-flex">
                            <p className="mb-0 ml-1 mr-3"><img  src={IconWait} width={10} height={10}></img >  Wait</p>
                            <p  className="mb-0 ml-1 mr-1"><img src={IconSetUp} width={10} height={10}></img> SetUp </p>
                     
                        </div>
                        <div className="d-flex">
                            <p  className="mb-0 ml-1 mr-3"><img src={IconProcess} width={10} height={10}></img> Process </p>
                            <p  className="mb-0 ml-1 mr-1"><img src={IconRepair} width={10} height={10}></img> Repair </p>
                       </div>
                        <div className="d-flex">
                            <p  className="mb-0 ml-1 mr-"><img src={IconReload} width={10} height={10}></img> Reload </p>
                            <p  className="mb-0 ml-1 mr-1"><img src={IconDefect} width={10} height={10}></img> Defect </p>
                         </div>
                        <div className="d-flex">
                            <p  className="mb-0 ml-1 mr-1"><img src={IconThinking} width={10} height={10}></img> Evaluation </p>
                       </div>
                       
                           </div>
        }else if(state=="Process"){
            return <div className="">
                        <h6>Process</h6>
                        
                        <p className="mb-0 ml-1 mr-1">  Process: process_id</p>
                        <p  className="mb-0 ml-1 mr-1"> Last process: process_id </p>
                 
                    </div>
        }else if(state=="ProductionState"){
            return <div className="">
            <h6>Production state</h6>            
            <p className="mb-0 ml-1 mr-1">  production name: production state</p>
            <p  className="mb-0 ml-1 mr-1"> in simulation it is possible to hover over position, to get more information </p>
     
        </div>
        }
   
            
    },[state])

    return(
        <div className="d-flex flex-row">
            <div ref={containerRef} >

                <Stage
                    ref={stageRef}
                    width={200}
                    height={200}
                    scaleX={1.8}
                    scaleY={1.8}
                    className="overflow-atuo"
                    draggable={true}
                    style={{backgroundColor:"#F7F7F7"}}            
                >
                    <Layer>
                        <Group x={x} y={y}>
                            <Rect x={0} y={0} width={width} height={height} fill="#DFDFDF" />    
                            <Group onMouseEnter={e => {onMouseEnter(e,"KPI")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={"APT: " + "20" + "%"} x={width-35} y={3} fontSize={7}></Text>
                                <Text text={"AST: " + "10" + "%"} x={width-35} y={10} fontSize={7}></Text>
                            </Group>
                            <Group onMouseEnter={e => {onMouseEnter(e,"Name")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={"m0"} x={17} y={5}></Text>
                                <Image image={imageMachine} y={4} x={4} width={12} height={12}></Image> 
                            </Group>
                            <Image image={imageProcess} y={23} x={5} width={10} height={10}></Image> 
                            <Group onMouseEnter={e => {onMouseEnter(e,"State")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={"Process"} x={15} y={25} fontSize={9}></Text>
                                <Text text={"t: "+7} x={width-35} y={27} fontSize={7}></Text>
                            </Group>
                            <Line points= {[0,20,width,20]}   stroke='black'   strokeWidth= {1} ></Line>
                            <Line points= {[0,35,width,35]}   stroke='black'   strokeWidth= {1} ></Line>
                            <Group onMouseEnter={e => {onMouseEnter(e,"ProductionState")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Group x={10} y={45}>
                                    <Circle radius={6} x={0} y={0}  fill={ "lightblue"} strokeWidth={2} stroke={ "blue"} >                
                                    </Circle>
                                    <Arc innerRadius={0} outerRadius={6} fill={ "blue"} angle={0.5*360}></Arc>
                                </Group> 
                                <Text text={"p2" + ": "+"source"} x={20} y={40} fontSize={10}></Text>                                
                                
                            </Group>
                            <Group onMouseEnter={e => {onMouseEnter(e,"Process")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={  "Process:" + 2 } x={20} y={55} fontSize={10}></Text>            
                                <Text text={"Last Process: " + 0 } x={20} y={65} fontSize={10}></Text>
                            </Group>
                                            
                            <Image image={imageProcess} y={55} x={5} width={10} height={10}></Image> 
                            <Image image={imageHistory} y={65} x={5} width={10} height={10}></Image> 
                            <Group onMouseEnter={e => {onMouseEnter(e,"Queue")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Image image={imageQueue} y={85} x={5} width={10} height={10}></Image> 
                                <Text text={"q0, q0"} x={20} y={85} fontSize={10}></Text>
                            </Group>
                        </Group>
                    </Layer>  
                
                </Stage>
        
            </div>
            <div className="flex-fill  ">    
              <div className="d-flex  flex-column h-100">
                    <h5 className="text-left ml-2 mt-1 ">Information</h5>                    
                    <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-wrap">
                        {information}
                       
                    </div>
                </div>
            </div>
        </div>

    )

}

export default MachineInformationCard