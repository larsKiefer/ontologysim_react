
import {TiDelete} from "react-icons/ti"

import {FiMinimize2,FiMaximize2} from "react-icons/fi"

/** view product data on right side of screen */
function ProductWindow(props){

    const product  = props.data
  
    return(

        <div style={{
            position: "absolute",
            top: props.height-350 + "px",
            left: props.width -300-30 + "px",        
            zIndex: 10,
            width:300
          }} >

            <div className="bg-white">
              <div className="d-flex flex-row align-items-center ml-1">
                <h6 className="text-left mb-1" style={{fontSize:12}}>Product {props.productID}</h6>
                    <h6 className="text-muted text-left pl-2 mb-1 align-self-end" style={{fontSize:10}}> Product type: {product.product_type}</h6>
                    <FiMinimize2 className="ml-auto mr-1 " onClick={props.closeClick} size={18} type="button"></FiMinimize2>
                    <TiDelete className=" mr-1 " size={18} type="button" onClick={props.windowClick} ></TiDelete>
              </div>

              <div className="ml-1">
           
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
                <div className="row mt-2">
                    <div className="col-12">
                    <p>
                        More coming soon
                    </p>
                    </div>
                </div>
                
              </div>
            </div>
          </div>


    )
}

export default ProductWindow