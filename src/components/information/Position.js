import React from "react";


import { Rect, Circle, Group, Text,Line,Arc } from '../../konva/react-konva';

/**
 * design position
 * @param {*} props 
 * @returns 
 */
function Position(props){
    const colors = ["blue","green","orange"]
    const lightColors = ["lightblue","lightgreen","lightorange"]
    const x=props.x
    const y=props.y
    const radius = 6    
   
    //style position
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
               
                <Circle radius={radius} x={0} y={0}  fill={ lightColor} strokeWidth={2} stroke={ color} >                
                </Circle>
                <Arc innerRadius={0} outerRadius={radius} fill={ color} angle={percentage*360}></Arc>
                </Group>)
      
        }else{
            return(<Circle radius={radius} x={0} y={0}  fill={"white"} ></Circle>)
                
        }

    },[props.position.blockedSpace,props.position.product_name])

    return(
        <Group x={x} y={y} onMouseEnter={e => {     
            if (props.position.blockedSpace==1 && props.position.product_name == "") {
              props.onMouseEnter(e,"Blocked")
            } else if(props.position.blockedSpace==0 && props.position.product_name == ""){
                props.onMouseEnter(e,"Empty")
            } else {
              props.onMouseEnter(e,"Product")
            }
          }}
          onMouseLeave={e => {
            props.onMouseLeave(e)
          }}   
          
          >
       {styleComponent}
       </Group>
    )

}

export default Position;