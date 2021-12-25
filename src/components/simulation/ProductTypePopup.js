import React, { useRef } from "react";
import { Card } from "react-bootstrap";

// view product type in pop up
const ProductTypePopup = ({ position, productTypeName }) => {
  const containerRef = useRef(null)
 
  return (
    <Card ref={containerRef} className="mb-0 mt-0 pb-0 pt-0 "
      style={{
        position: "absolute",
        top: position.y +120 + "px",
        left: position.x +150 + "px",        
        zIndex: 10,
        width:120
      }}
    >
     
      <Card.Body className="mb-1 mt-1 pt-1 pb-1 pl-1 mr-1 pr-1 ml-1">
      <div className="row">
          <div className="col-12 d-flex flex-row">            
            <h6 className="text-left pl-2 mb-1 align-self-end" style={{fontSize:10}}> Product type: {productTypeName}</h6>
            </div>
        </div>
        
      </Card.Body>
    </Card>
  );
};

export default ProductTypePopup;
