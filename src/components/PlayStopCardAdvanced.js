import React, { Component, useState, useEffect } from "react";
import {
    Card,
    ListGroup,
    Container,
    Button,
    Row,
    Col,
    Form,
    Collapse,
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
import { useForm,useController,Controller  } from "react-hook-form";
import { Modal } from "bootstrap";

import {IoIosArrowDropdownCircle,IoIosArrowDropupCircle} from "react-icons/io"
import colors from "../style/theme.module.scss";
import Select from 'react-select'
import 'rc-slider/assets/index.css';

// pay start stop element advanced (for detail) (collapsible)
function PlayStopElementAdvanced(props) {
    const { register, handleSubmit,control } = useForm();
    const [open, setOpen] = useState(false);
    
    const location = useLocation()

    var simulationState = useSelector(state => state.simulation);
    var loadSimulationState = useSelector(state => state.loadSimulation);
    var eventlistState = useSelector(state => state.event);
    var productionState = useSelector(state => state.production)

    const dispatch = useDispatch();


    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };
      const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
      };
      
      const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
      );
    

    //define filter options, filter ontologysim element
    const transporterOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
    ];
    
    const machineOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
    ];

    
   const groupedOptions = [
    {
      label: 'Transporter',
      options: transporterOptions,
    },
    {
      label: 'Machine',
      options: machineOptions,
    },
  ];

    //control start stop of simulation
    function startStop() {
        if (!simulationState.alreadyStarted) {
           
            dispatch(startLoadSimulationAndNextEvent(loadSimulationState));
            
        } else {
            dispatch({ type: "CHANGE_RUNNING" });
            dispatch(nextEvent(1, true));
        }
    }
    
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

    useEffect(() => {
        if (loadSimulationState.defaultFiles.length == 0) {
            dispatch(getSimulationDefaultFile());
        }
    }, []);

    function onSubmit(data){
        
        dispatch(startLoadSimulationUntilTime(loadSimulationState,data.time))
        
    }


    { /*,{required:true, pattern: {
        value: /d+/,
        message: "Entered value does not match email format"
      } } */ }

      const registerOptions = {
        // ...
        time: { required: "Time is required" }
      };

      function handleInputChange(value){
          props.selectElement(value)
      }
      
      //run until element
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

      //back and forward button
      const buttonList = React.useMemo(()=>{

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
                    <div className=" d-flex flex-column ml-4 w-100">
                        <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                            Filter
                        </h6>

                        <div className=" w-100"  style={{maxWidth:"200px"}}>
                            <Controller                               
                                key={"controller"}
                                render={({
                                    field,
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (                                  
                                <Select                
                                    defaultValue={""}                                                           
                                    name="selectedElement"
                                    options={groupedOptions}                               
                                    classNamePrefix="select"
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={(e)=>handleInputChange(e)}
                                />  ) }  
                                name={"selectedElement"}                      
                                control={control}>
                            </Controller>  
                          
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

                   
                    <div className="ml-auto pl-2 d-flex align-items-center mr-2">
                        {!open ?
                        <IoIosArrowDropdownCircle type="button" onClick={()=>setOpen(!open)} color={colors.primary} size={20} ></IoIosArrowDropdownCircle>
                        :
                        <IoIosArrowDropupCircle type="button" onClick={()=>setOpen(!open)} color={colors.primary} size={20} ></IoIosArrowDropupCircle>
                        }
                    </div>
                  
                </div>
                
            </div>
            {open &&
                <hr className="mb-1 mt-1"></hr>
            }
            <Collapse in={open} >
                <div className="row  ">
                    <div className="col-sm-6 col-12 d-flex">                       
                        <div className=" d-flex flex-column ">
                            <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
                                Run until
                            </h6>

                            <div className="">
                                {timeForm}
                            
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12 d-flex">
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
            </Collapse>
          
        </div>
    );
}

export default PlayStopElementAdvanced;
