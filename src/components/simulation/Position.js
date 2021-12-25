import React from "react";
import { Arc } from "react-konva";

import { Rect, Circle, Group, Text,Line } from '../../konva/react-konva';

/**
 * konva: view position and product
 * @param {*} props 
 * @returns 
 */
function Position(props){
    const colors = ["blue","green","orange"]
    const lightColors = ["lightblue","lightgreen","lightorange"]
    const x=props.x
    const y=props.y
    const radius = 6
    
    const selected = props.selectedProductID == props.position.product_name
   
    //<Circle radius={radius} x={0} y={0}  fill={"grey"} ></Circle>
    
    const styleComponent = React.useMemo(()=>{
        if(props.position.blockedSpace==0){
            return (
                
                <Circle radius={radius} x={0} y={0}  fill={"white"} ></Circle>
                
            )
        }else if(props.position.product_name == ""){
            return (
               <Group>
                    <Circle radius={radius} x={0} y={0}  fill={"white"} strokeWidth={2} stroke={"red"}></Circle>
                <Line points={[-Math.sqrt(12),-Math.sqrt(12),Math.sqrt(12),Math.sqrt(12)]} fill={"red"} strokeWidth={2}  stroke={"red"}></Line>
               
                </Group>
            )
        }else if(props.position.blockedSpace) {

            const productTypeName = props.product.product_type
            const percentage = props.product.percentage
            var numberProductType = productTypeName.replace( /^\D+/g, '')
            var color= colors[numberProductType%colors.length]
            var lightColor =lightColors[numberProductType%lightColors.length]
            
            return( <Group>
               
                <Circle radius={radius} x={0} y={0}  fill={selected ?  "#ffcccb" : lightColor} strokeWidth={2} stroke={ color} >                
                </Circle>
                <Arc innerRadius={0} outerRadius={radius} fill={selected ?  "red" : color} angle={percentage*360}></Arc>
                </Group>)
      
        }else{
            return(<Circle radius={radius} x={0} y={0}  fill={"white"} ></Circle>)
                
        }

    },[props.position.blockedSpace,props.position.product_name,selected])

    return(
        <Group x={x} y={y} onMouseEnter={e => {
            e.target._clearCache();            
            const container = e.target.getStage().container();
            if (props.position.blockedSpace==0 || props.position.product_name == "") {             
              props.handleHover(null);
              container.style.cursor = "not-allowed";
            } else {             
              props.handleHover(props.position.product_name, e.target.getAbsolutePosition());
              container.style.cursor = "pointer";
            }
          }}
          onMouseLeave={e => {           
            props.handleHover(null);
            const container = e.target.getStage().container();
            container.style.cursor = "";
          }}
          
          onClick={e => {
            if (props.position.blockedSpace==0 || props.position.product_name == "") {
              return;
            }
            if (selected) {
              props.handleDeselect(props.position.product_name);
            } else {
              props.handleSelect(props.position.product_name);
            }
          }}
          onTap={e => {
            if (props.position.blockedSpace==0 || props.position.product_name == "") {
              return;
            }
            if (selected) {
              props.handleDeselect(props.position.product_name);
            } else {
              props.handleSelect(props.position.product_name);
            }
          }}
          
          
          >
       {styleComponent}
       </Group>
    )

}

export default Position;