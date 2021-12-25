import React, {useEffect, useState} from "react";

import { Stage,Group,Text,Rect,Image,Line,Layer,Circle } from "../../konva/react-konva"
import Position from "./Position"
import useImage from 'use-image';

import IconQueue from "../../assets/icons/stack-of-papers.svg"
import IconLogin from "../../assets/icons/login.svg"
import IconLogout from "../../assets/icons/logout.svg"
import IconPosition from "../../assets/icons/location-pointer.svg"
import { propTypes } from "react-bootstrap/esm/Image";

/**
 * information card, where the queue visualisation is described
 * @returns 
 */
function QueueInformationCard(){

    const containerRef = React.useRef(null);
    const stageRef = React.useRef(null);

     
    const x=15
    const y=20
    const name ="start_queue"
    

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


    var firstPartName = ""
    var secondPartName = ""
    if(name.length>5){
        var res=name.split("_")
        firstPartName = res[0]
        secondPartName =res[1]
    }
    
    const width=50;
    const height = 50;
    const color="#BFBFBF"

    const postionList = ["po0","po1","po2","po3","po4","po5"]

    const positionDataQueue= {
        "po0": {
            "blockedSpace": 1,
            "product_name": "p1"
        },
        "po1": {
            "blockedSpace": 1,
            "product_name": ""
        },
        "po2": {
            "blockedSpace": 0,
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

    const productDataQueue={
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

    // view data on the right side
    const information = React.useMemo(()=>{
        console.log(state)
        if(state ==null){
            return <p className="mb-0 ml-1 mr-1">Hover to view information</p>
        
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
        }else if(state=="TranporterArriving"){
            return <div className="">
            <h6>Transporter arriving</h6>       
            <p className="mb-0 ml-1 mr-1">  transporter name</p>                    
        </div>
        }else if(state == "TranporterLeaving"){
            return <div className="">
                <h6>Transporter leaving</h6>       
                <p className="mb-0 ml-1 mr-1">  transporter name</p>                    
            </div>
        }else if(state == "TranporterCurrent"){
            return <div className="">
                <h6>Transporter current position</h6>      
                <p className="mb-0 ml-1 mr-1">  transporter name</p>                    
            </div>
        }else if(state=="Empty"){
            return <div className="">
                        <h6>Empty position</h6>                        
                        <p className="mb-0 ml-1 mr-1"> not selectable</p>
                    </div>
        }
   
            
    },[state])
    
    //save positions
    const positions = React.useMemo(()=>{
        var i2=0
        return postionList.map((element,i) => {
            if(i<5){
                var position = positionDataQueue[element]
                if(i%3==0){
                    return <Position  handleHover={handleHover} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} x={5+5} y={27+15*i2} position={position} product={productDataQueue[position.product_name]} ></Position> 
                }else if(i%3==1){
                    return <Position handleHover={handleHover}  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} x={5+20} y={27+15*i2} position={position} product={productDataQueue[position.product_name]} ></Position> 
                }else{
                    var positionStyle=<Position handleHover={handleHover}  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} x={5+35} y={27+15*i2} position={position} product={productDataQueue[position.product_name]} ></Position> 
                    i2+=1
                    return positionStyle                
                }
            }
        })
          

    },[])

    const [image] = useImage(IconQueue);
    const [imageLogin] = useImage(IconLogin);  
    const [imageLogout] = useImage(IconLogout);
    const [imagePosition] = useImage(IconPosition); 
    /**three dots, when more than 5 positions */
    const loadAdditionalPoints=React.useMemo(()=>{
        var endPoints = []   
        if(6>5){
            for(var i=0;i<3;i++){

                endPoints.push(<Circle x={36+5*i} y={25+17*1} radius={2} fill="white"></Circle>      )
            }
        }
        return endPoints
    })
   

    const size=5
    const currentSize =6

    return(
        <div className="d-flex flex-row">
            <div ref={containerRef}  >

                <Stage
                    ref={stageRef}
                    width={200}
                    height={200}
                    scaleX={2.5}
                    scaleY={2.5}
                    className="overflow-atuo"
                    draggable={true}
                    style={{backgroundColor:"#F7F7F7"}}            
                >
                    <Layer>
                    <Group x={x} y={y}>
                           
                    <Group y={-12} x={0} onMouseEnter={(e)=>onMouseEnter(e,"TranporterArriving")} onMouseLeave={(e)=>onMouseLeave(e)}>            
                        <Image image={imageLogin} width={10} height={10} x={3} y={3}></Image>
                        <Text text={"t0"} x={7} y={-2} fontSize={6}></Text>
                    </Group>
                    <Group y={-12} x={15} onMouseEnter={(e)=>onMouseEnter(e,"TranporterLeaving")} onMouseLeave={(e)=>onMouseLeave(e)}>            
                        <Image image={imageLogout} width={10} height={10} x={3} y={3}></Image>
                        <Text text={"t1"} x={5} y={-2} fontSize={6}></Text>
                    </Group>
                    <Group y={-12} x={30} onMouseEnter={(e)=>onMouseEnter(e,"TranporterCurrent")} onMouseLeave={(e)=>onMouseLeave(e)}>            
                        <Image image={imagePosition} width={10} height={10} x={3} y={3}></Image>
                        <Text text={"t2"} x={5} y={-2} fontSize={6}></Text>
                    </Group>


                        <Rect width={width} height={height} x={0} y={0}  fill={color} />
                        <Group onMouseEnter={(e)=>onMouseEnter(e,"QueueName")} onMouseLeave={(e)=>onMouseLeave(e)}>
                        <Image image={image} width={10} height={10} x={3} y={3}></Image>
                        {firstPartName=="" ?
                            <Text text={name} x={15} y={4} fontSize={9}></Text>
                        :
                        <Group>
                            <Text text={firstPartName} x={15} y={2} fontSize={6}></Text>
                            <Text text={secondPartName} x={15} y={8} fontSize={6}></Text>       
                        </Group>

                        }
                        
                        <Line points= {[0,17,width,17]}   stroke='black'   strokeWidth= {1}  />
                        <Text text={size+"P"} x={width-10} y={2} fontSize={7}></Text>
                        {parseFloat(currentSize)/parseFloat(size)*100>10 ?
                            <Text text={Math.round(parseFloat(currentSize)/parseFloat(size)*100)+"%"} x={width-15} y={10} fontSize={7}></Text>
                        :
                        <Text text={Math.round(parseFloat(currentSize)/parseFloat(size)*100)+"%"} x={width-10} y={10} fontSize={7}></Text>
                
                        }
                        </Group>
                            {positions}
                            <Group onMouseEnter={(e)=>onMouseEnter(e,"LoadAdditionalPoints")} onMouseLeave={(e)=>onMouseLeave(e)}>
                                {loadAdditionalPoints}
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

export default QueueInformationCard