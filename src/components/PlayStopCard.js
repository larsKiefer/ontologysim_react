import React, { Component, useState, useEffect } from "react";
import {
    Card,
    ListGroup,
    Container,
    Button,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import { useLocation, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import {
    nextEvent,
    startLoadSimulationAndNextEvent,
    endlessCalls,
} from "../actions/eventAction";
import {startLoadSimulationUntilTime} from "../actions/eventAction"
import useWindowDimensions from "./useWindowDimensions";
import { CgAdd } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { getSimulationDefaultFile } from "../actions/loadSimulationAction";
import { useForm,Controller } from "react-hook-form";

// action bar for play start stop actions
function PlayStopElement() {
    const { register, handleSubmit, control } = useForm();
    const location = useLocation()

    var simulationState = useSelector(state => state.simulation);
    var loadSimulationState = useSelector(state => state.loadSimulation);
    var eventlistState = useSelector(state => state.event);
    var productionState = useSelector(state => state.production)

    const dispatch = useDispatch();

    //control start stop of simulation
    function startStop() {

        if (!simulationState.alreadyStarted) {
           
            dispatch({type:"SET_FINISHED_FLASH_MESSAGE",payload:{finishFlashMessage:true}})
            dispatch(startLoadSimulationAndNextEvent(loadSimulationState));
            
        } else {
            dispatch({ type: "CHANGE_RUNNING" });
            dispatch(nextEvent(1, true));
        }
    }
    
    //trigger continously to get next event
    if (
        simulationState.alreadyStarted &&
        simulationState.run &&
        !eventlistState.isLoading
    ) {
        dispatch(nextEvent(1, true));
    }

    function getNextEvent(number, full) {
        dispatch(nextEvent(number, full));
    }

    //load default files
    useEffect(() => {
        if (loadSimulationState.defaultFiles.length == 0) {
            dispatch(getSimulationDefaultFile());
        }
    }, []);

    function onSubmit(data){
        
        dispatch(startLoadSimulationUntilTime(loadSimulationState,data.time))
        
    }



      const registerOptions = {
        // ...
        time: { required: "Time is required" }
      };

      const timeForm = React.useMemo( () => {
        return (
            <Form className="d-flex flex-row" onSubmit={handleSubmit(onSubmit)} >
                  <Controller
                    control={control}
                    name="time"
                    rules={registerOptions.time}
                    render={({
                        field,
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                    }) => (
                        <Form.Control size="sm" min={1}  style={{width:"100px"}}  type="number" placeholder="time"
                        {...field}
                        />
                    )}
                    />      
                <Button
                    className="btn-sm d-flex align-items-center" type="submit"  data-toggle="tooltip" data-placement="bottom" title="Events until the given time are not saved"                                 
                >
                    {" "}
                    <FaPlay className="mr-2"></FaPlay> Run
                </Button>
            </Form>
        )

      },[loadSimulationState])

      //depending on selected view, the options are changing
      const buttonList = React.useMemo(()=>{

        if(location.pathname == "/simulation/event"){
            return(
                <div className="d-flex ">
                    <Button className="btn-sm" disabled={true}>
                        {"<<"}
                    </Button>
                    <Button className="btn-sm" disabled={true}>
                        {"<"}
                    </Button>
                    {simulationState.run ? (
                        <Button
                            className="btn-sm d-flex align-items-center"
                            onClick={() => startStop()}
                        >
                            {" "}
                            <FaPause className="mr-2"></FaPause> Pause
                        </Button>
                    ) : (
                        <Button
                            className="btn-sm d-flex align-items-center"
                            onClick={() => startStop()}
                        >
                            {" "}
                            <FaPlay className="mr-2"></FaPlay> Start
                        </Button>
                    )}
    
                    <Button className="btn-sm" disabled={!simulationState.alreadyStarted} onClick={() => getNextEvent(1, true)}>
                        {">"}
                    </Button>
                    <Button className="btn-sm" disabled={!simulationState.alreadyStarted} onClick={() => getNextEvent(10, true)}>
                        {">>"}
                    </Button>
                </div>)
        }else if(location.pathname == "/simulation/view" || location.pathname == "/simulation/detail"){

            var indexProductionState = productionState.index
            var productionList = productionState.productionList
            var buttonBackwardDisable = true
            var nextEventEventAPI = true
            if(indexProductionState>0){
                if(productionList.length == indexProductionState+1){
                    nextEventEventAPI=false                    
                }else{
                    nextEventEventAPI=true                   
                }
                buttonBackwardDisable = false
            }else{
                if(productionList.length == indexProductionState+1){
                    nextEventEventAPI=false
                }
            }

            return(
                <div className="d-flex ">
                    <Button className="btn-sm" disabled={buttonBackwardDisable} onClick={()=>dispatch({type: 'GO_TO_LAST_PRODUCTION_INDEX'})}>
                        {"<<"}
                    </Button>
                    <Button className="btn-sm" disabled={buttonBackwardDisable} onClick={()=>{dispatch({type:'BACKWARD_PRODUCTION_INDEX'})}}>
                        {"<"}
                    </Button>
                    {simulationState.run ? (
                        <Button
                            className="btn-sm d-flex align-items-center"
                            onClick={() => startStop()}
                        >
                            {" "}
                            <FaPause className="mr-2"></FaPause> Pause
                        </Button>
                    ) : (
                        <Button
                            className="btn-sm d-flex align-items-center"
                            onClick={() => startStop()}
                        >
                            {" "}
                            <FaPlay className="mr-2"></FaPlay> Start
                        </Button>
                    )}
    
                    <Button className="btn-sm" disabled={!simulationState.alreadyStarted } onClick={() =>{nextEventEventAPI  ? dispatch({type:  'NEXT_PRODUCTION_INDEX'}) : getNextEvent(1, true)}}>
                        {">"}
                    </Button>
                    <Button className="btn-sm" disabled={!simulationState.alreadyStarted } onClick={() =>{nextEventEventAPI  ? dispatch({type:  'GO_TO_FIRST_PRODUCTION_INDEX'}) :  getNextEvent(10, true)}}>
                        {">>"}
                    </Button>
                </div>)
        }

        
          
      },[simulationState.alreadyStarted,simulationState.run,productionState,location,loadSimulationState])

    return (
        <div className="card w-100 pl-1 pr-1 pt-1 pb-1">
            <div className="row  ">
                <div className="col-lg-6 col-md-8 col-12 d-flex">
                    <div className="">
                        <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                            Simulation control
                        </h6>
                        
                            {buttonList}
                        
                    </div>
                    <div className=" d-flex flex-column ml-4">
                        <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                            Run until
                        </h6>

                        <div className="">
                            {timeForm}
                          
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-4 col-12 d-flex">
                    <div className="d-flex flex-column">
                    <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                        Current status
                    </h6>
                    <div className="d-flex align-items-center flex-fill ">
                        <h6 className="mb-0 mr-2 align-self-center  ">
                            Event: {eventlistState.nrEvent}
                        </h6>
                        <h6 className="mb-0">
                            Time: {eventlistState.time}                            
                        </h6>
                    </div>

                    </div>
                    <div  className="ml-auto pl-2">
                    <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                        Reset data
                     </h6>

                    <div className="d-flex  ">
                        <Button
                            className="btn-sm d-flex align-items-center "
                            onClick={() => dispatch({ type: "REMOVE_EVENTS" })}                        >
                            <AiFillDelete className="mr-2" /> Delete{" "}
                        </Button>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default PlayStopElement;
