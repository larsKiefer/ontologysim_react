import { axiosInstance } from "./axiosInstance";

/**
 * get kpis + reducer dispatch
 */
export const refreshKPIs = function () {
  
  return (dispatch) => {
    dispatch({type:"ADD_KPIS"})
    return axiosInstance.get("/kpi")
    .then(({ data }) => {
      
       dispatch({ type: 'ADD_KPIS_SUCCESS',payload: {...data} });
      
   })
   .catch(error => {
     throw(error);
   });
  }
  };


/**
 * return api call for downloading kpi data
 * @returns 
 */
export const getKpiList = function(){

  return axiosInstance.get("/kpiList")

}