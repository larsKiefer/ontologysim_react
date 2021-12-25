import {axiosInstance} from "./axiosInstance";

/**
 * transforming process list to product type data
 * @param {*} data 
 * @returns 
 */
export function getProductType (data) {
    var data2={}
    data2["list"]=JSON.parse(data.list)
    
    return axiosInstance.post("/process",data2)

 
    };
