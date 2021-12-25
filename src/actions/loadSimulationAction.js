
import { axiosInstance } from "./axiosInstance";

/**
 * load default file name
 * @returns 
 */
export function getSimulationDefaultFile() {
  
    return (dispatch) => {
       
        axiosInstance.get("/load_files") 
        .then(function (response) {
            dispatch({type : "LOAD_DEFAULT_FILES", payload : response.data})}     
        )
      .catch(error => {
        throw(error);
      });

}}

/**
 * run a complete simulation & get kpis
 * @param {*} data : checkbox data
 * @param {*} loadSimulation 
 * @returns 
 */
export function runCompleteSimulation(data,loadSimulation) {
  
  data = {...data,...loadSimulation}
  return (dispatch) => {
    dispatch({type:"IS_LOADING"})
    dispatch({type:"ACTIVATE_ALREADY_RUNNING"})
    dispatch({type:"REMOVE_EVENTS"})    
    dispatch({type:"SET_FINISHED_FLASH_MESSAGE",payload:{finishFlashMessage:true}}) 
    return axiosInstance.post("/runSimulation",data)
        .then(function (response) {
            
            dispatch({type : "ADD_EVENT_SUCCESS", payload : response.data}) 
            if(data.kpiData){ 
              axiosInstance.get("/kpi").then(({ data }) => {      
                dispatch({ type: 'ADD_KPIS_SUCCESS',payload: {...data} });
                dispatch({type:"IS_LOADING"})             
              })
            }else{
              dispatch({type:"IS_LOADING"})
            }
          }
        )
      .catch(error => {
        throw(error);
      });

  }
}
