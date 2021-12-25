import React, {useEffect, useState} from "react";
import { Stage,Group,Text,Rect,Image,Line,Layer } from "../../konva/react-konva"
import QueueHorizontal from "./QueueHorizontal";
import IconTransporter from "../../assets/icons/truck.svg"
import IconWait from "../../assets/icons/hourglass.svg"
import IconSetUp from "../../assets/icons/exchange.svg"
import IconRepair from "../../assets/icons/automobile-with-wrench.svg"
import IconMove from "../../assets/icons/move.svg"
import IconReload from "../../assets/icons/reload.svg"
import IconDefect from "../../assets/icons/removeRed.svg"
import IconThinking from "../../assets/icons/thinking.svg"

import useImage from 'use-image';
/**
 * information card, where the transporter visualisation is described
 * @returns 
 */
function TransporterInformationCard(){

    const containerRef = React.useRef(null);
    const stageRef = React.useRef(null);


    const horizonalQueueData= {
        "current_size": 4,
        "positions": [
            "po0",
            "po1",
            "po2",
            "po3",
            "po4",
            "po5",
            "po6"
        ],
        "size": 6
    }

    const positionDataHorizontalQueue= {
        "po0": {
            "blockedSpace": 1,
            "product_name": "p1"
        },
        "po1": {
            "blockedSpace": 1,
            "product_name": "p2"
        },
        "po2": {
            "blockedSpace": 1,
            "product_name": ""
        },
        "po3": {
            "blockedSpace": 1,
            "product_name": "p3"
        },
        "po4": {
            "blockedSpace": 1,
            "product_name": "p4"
        },
        "po5": {
            "blockedSpace": 1,
            "product_name": "p5"
        }

    }

    const productDataHorizontalQueue={
        "p1": {
            "blocked_for_machine": 1,
            "blocked_for_transporter": 1,          
            "percentage": 1,
            "product_type":"p_t0"
        },
        "p2": {
            "blocked_for_machine": 1,
            "blocked_for_transporter": 1,          
            "percentage": 0.25,
            "product_type":"p_t1"
        },
        "p3": {
            "blocked_for_machine": 1,
            "blocked_for_transporter": 1,    
            "product_type":"p_t0",      
            "percentage": 1,
        },
        "p4": {
            "blocked_for_machine": 1,
            "blocked_for_transporter": 1,  
            "product_type":"p_t0",          
            "percentage": 0,
        },
        "p5": {
            "blocked_for_machine": 1,
            "blocked_for_transporter": 1,  
            "product_type":"p_t1",          
            "percentage": 1,
        },

    }


    const x=5
    const y=20

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

    const onMouseEnterCallback = React.useCallback((e,type) => {
        e.target._clearCache();                                                    
        const container = e.target.getStage().container();                                                   
        handleHover(type);
        container.style.cursor = "pointer";   
    })

    const onMouseLeaveCallback = React.useCallback((e,type) => {
        handleHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = ""; 
    })

    // view data on the right side
    const information = React.useMemo(()=>{
        console.log(state)
        if(state ==null){
            return <p className="mb-0 ml-1 mr-1">Hover to view information</p>
        }else if(state == "Name"){
            return <p className="mb-0 ml-1 mr-1">Transporter: Name</p>
        }else if(state == "KPI"){
            return  <div className="">
                        <h6>KPI</h6>
                        <p className="mb-0 ml-1 mr-1 ">KPI data of the last time intervall</p>
                        <p className="mb-0 ml-1 mr-1 "><span className="font-weight-bold" >AUTT:</span> Actual transportation time in percent</p>
                        <p className="mb-0 ml-1 mr-1 "><span className="font-weight-bold" >AUST:</span> 	Actual setup time in percent</p>
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
                            <p className="mb-0 ml-1 mr-3"><img  src={IconWait} width={10} height={10}></img >  Transport</p>
                            <p className="mb-0 ml-1 mr-1"><img  src={IconWait} width={10} height={10}></img >  Wait</p>
                            
                        </div>
                        <div className="d-flex">
                            <p  className="mb-0 ml-1 mr-3"><img src={IconSetUp} width={10} height={10}></img> SetUp </p>
                            <p  className="mb-0 ml-1 mr-1"><img src={IconRepair} width={10} height={10}></img> Repair </p>
                        </div>
                        <div className="d-flex">
                            <p  className="mb-0 ml-1 mr-3"><img src={IconReload} width={10} height={10}></img> Reload </p>
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
        }else if(state=="QueueName"){
            return <div className="">
            <h6>Queue basic data</h6>            
            <p className="mb-0 ml-1 mr-1">  queue name</p>
            <p  className="mb-0 ml-1 mr-1"> filling of queue in percent </p>
            <p  className="mb-0 ml-1 mr-1"> size of queue, total number of positions </p>
        </div>
        }else if(state=="LoadAdditionalPoints"){
            return <div className="">
                <h6>Additional Positions</h6>       
                <p className="mb-0 ml-1 mr-1">  Only the first 5 positions are visualized</p>
            </div>
        }else if(state=="Product"){
        
            return<div className="">
                <h6>Product</h6>       
                <p className="mb-0 ml-1 mr-1">  in simulation, you can select a product and hover over it to get more infomration</p>
                <p className="mb-0 ml-1 mr-1">  the fill level of the product despribes the finished percentage</p>
         
            </div>
        }else if(state == "Blocked"){
            return <div className="">
                <h6>Blocked position</h6>       
                <p className="mb-0 ml-1 mr-1">  position is blocked from a product</p>   
                <p className="mb-0 ml-1 mr-1"> no selection possible</p>                    
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
                            <Rect x={0} y={0} width={width} height={height} fill={color} /> 
                            <Group onMouseEnter={e => {onMouseEnter(e,"KPI")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={"AUTT: " + "10"+ "%"} x={width-35} y={3} fontSize={7}></Text>
                                <Text text={"AUST: "+"15"+ "%"} x={width-35} y={10} fontSize={7}></Text>
                            </Group>   
                            <Group onMouseEnter={e => {onMouseEnter(e,"Name")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Text text={"t0"} x={25} y={5}></Text>
                                <Image image={image} x={4} y={4} width={17} height={17}></Image>
                            </Group>
                            <Group onMouseEnter={e => {onMouseEnter(e,"State")}}  onMouseLeave={e => onMouseLeave(e)}>
                                <Image key={"imageWait"} image={imageWait} y={23} x={5} width={10} height={10}></Image>                  
                                <Text text={"WAIT"} x={15} y={25} fontSize={9}></Text>
                                <Text text={"t: "+"10"} x={width-35} y={27} fontSize={7}></Text>
                            </Group>
                            <Line points= {[0,20,width,20]}   stroke='black'   strokeWidth= {1} ></Line>
                            <Line points= {[0,35,width,35]}   stroke='black'   strokeWidth= {1} ></Line>             
                            <QueueHorizontal x={2.5} y={40} onMouseEnter={onMouseEnterCallback} onMouseLeave={onMouseLeaveCallback}  queue={horizonalQueueData} position={positionDataHorizontalQueue} product={productDataHorizontalQueue}  name={"q1"}></QueueHorizontal>
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

export default TransporterInformationCard