import {TiDelete} from "react-icons/ti"

import blockedPositionImage from "../../assets/image/blockedPosition.PNG"
import halfProductImage from "../../assets/image/halfProduct.PNG"
import positionImage from "../../assets/image/position.PNG"
import productImage from "../../assets/image/product.PNG"
import stackImage from "../../assets/icons/stack-of-papers.svg"
import truckImage from "../../assets/icons/truck.svg"
import toolsImage from "../../assets/icons/tools.svg"
import locationImage from "../../assets/icons/location-pointer.svg"
import loginImage from  "../../assets/icons/login.svg"
import logoutImage from  "../../assets/icons/logout.svg"

import { useHistory } from "react-router"

/**
 * viewing legend in production simulation
 * @param {*} props 
 * @returns 
 */
function LegendSimulation(props){

    const history = useHistory()
    return(
        <div className="bg-white">
            <div className="row pt-2">
                <div className="col-12 d-flex flex-row align-items-center ml-1">
                    <h6 className="text-left mb-1" >Legend </h6>       
                    <TiDelete className="ml-auto mr-1 " size={20} type="button" onClick={props.closeLegend} ></TiDelete>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={positionImage} width="17" height="17" className="ml-2 align-self-center bg-light"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> empty position</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={blockedPositionImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> blocked position</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={productImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> product (start of production)</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={halfProductImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> product (half processed)</p>
                </div>
            </div>
          
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={locationImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> current location transporter</p>                    
                    
                </div>
            </div>
            <div className="row ">
                <div className="col-12 d-flex flex-row ">
                    <img src={logoutImage} width="17" height="17" className="ml-2 align-self-center"></img>                         
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> transporter driving from</p>  
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={loginImage} width="17" height="17" className="ml-2 align-self-center"></img>                         
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> transporter driving to</p>  
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={stackImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> queue</p>
                </div>
               
            </div>
            <div className="row">
                <div className="col-12 d-flex flex-row ">
                    <img src={truckImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> transporter</p>
                </div>
            </div>
            <div className="row pb-2">
                <div className="col-12 d-flex flex-row ">
                    <img src={toolsImage} width="17" height="17" className="ml-2 align-self-center"></img> 
                    <p className="ml-2 mb-0 align-self-center" style={{fontSize:15}}> machine</p>                    
                    <a href="" onClick={(e) => {e.preventDefault(); history.push("/simulation/info")}} style={{fontSize:10}} type="button" className="ml-auto mb-0 align-self-end mr-2"> {"View detail >>"}</a>
     
                </div>
            </div>


        </div>


    )

}

export default LegendSimulation