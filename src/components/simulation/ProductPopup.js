import React, { useRef } from "react";
import { Card } from "react-bootstrap";

const isClickedInside = (e, element) => {
  let node = e.target;
  while (node) {
    if (node === element) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

/**
 * Product pop element, view product data in pop up
 * @param {*} param0 
 * @returns 
 */
const ProductPopup = ({ position, product,name, onClose }) => {
  const containerRef = useRef(null)
  React.useEffect(() => {
    const onClick = e => {
      if (!isClickedInside(e, containerRef.current)) {
        onClose();
      }
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <Card ref={containerRef} className="mb-0 mt-0 pb-0 pt-0 "
      style={{
        position: "absolute",
        top: position.y +0 + "px",
        left: position.x +50 + "px",        
        zIndex: 10,
        width:300
      }}
    >
     
      <Card.Body className="mb-1 mt-1 pt-1 pb-1 pl-1 mr-1 pr-1 ml-1">
      <div className="row">
          <div className="col-12 d-flex flex-row">
            <h6 className="text-left mb-1" style={{fontSize:12}}>Product {name}</h6>
            <h6 className="text-muted text-left pl-2 mb-1 align-self-end" style={{fontSize:10}}> Product type: {product.product_type}</h6>
        </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="text-left mb-0" style={{fontSize:10}}>Percentage: {Math.round(product.percentage*100)}% </p>
           
            <p  className="text-left mb-0" style={{fontSize:10}}>Blocked transporter: {product.blocked_for_transporter}</p>
            <p  className="text-left mb-0" style={{fontSize:10}}>Queue time: {Math.round(product.queue_input_time)}</p>
          </div>
          <div className="col-6">
            <p  className="text-left mb-0" style={{fontSize:10}}>State: {product.state}</p>
            <p  className="text-left mb-0" style={{fontSize:10}}>Blocked machine: {product.blocked_for_machine}</p>
            <p  className="text-left mb-0" style={{fontSize:10}}>Start time: {Math.round(product.start_of_production_time)}</p>
          </div>
        </div>
      
        <p className="text-right w-100 mb-0" style={{fontSize:8}}>Click to select</p>
      </Card.Body>
    </Card>
  );
};

export default ProductPopup;
