import { axiosInstance } from "./axiosInstance";


/**
 * api call for next event
 * @param {*} number 
 * @param {*} full 
 * @returns 
 */
  export function nextEvent(number,full) {
    return function(dispatch) {
      dispatch({type:"ADD_EVENT"})
      axiosInstance.get("/nextEvent",{ params: { number: number,full:full } })
       .then(({ data }) => {
          dispatch({
            type: 'ADD_EVENT_SUCCESS',
            payload:   data
          });
      })
      .catch(error => {
        throw(error);
      });
    };
 }


/**
 * start new simulation and get next event
 * @param {*} loadSimulationState 
 * @returns 
 */
export function startLoadSimulationAndNextEvent(loadSimulationState) {
  
  return function(dispatch) {
    return axiosInstance.post("/start",loadSimulationState)
     .then(({ data }) => {
       
        dispatch({ type: 'START_SIMULATION',payload: {...data} });
        dispatch(nextEvent(1,true))
    })
    .catch(error => {
      throw(error);
    });
  };
}

/**
 * start new simulation, get next event und remove all events
 * @param {*} loadSimulationState 
 * @param {*} timeStart 
 * @returns 
 */
export function startLoadSimulationUntilTime(loadSimulationState,timeStart) {
 
  var loadSimulationState = {...loadSimulationState, time:timeStart,onlyLastEvent:true}
  
  return function(dispatch) {
    dispatch({type:"ACTIVATE_ALREADY_RUNNING"})
    dispatch({type:"REMOVE_EVENTS"})    
    dispatch({type:"SET_FINISHED_FLASH_MESSAGE",payload:{finishFlashMessage:true}})
    return axiosInstance.post("/startUntilTime",loadSimulationState)
     .then(({ data }) => {
        
        dispatch({ type: 'START_SIMULATION',payload: {alreadyStarted:true,
          run: false} });
        dispatch({
          type: 'ADD_EVENT_SUCCESS',
          payload: data
        })
    })
    .catch(error => {
      throw(error);
    });
  };
}



