import { axiosInstance } from "./axiosInstance";

/**
 * get production from ini files
 * @param {*} data : ini file data
 * @returns 
 */
export function getProductTypeFromFile(data) {

    var data2 = {}
    data2["data"] = data
 
    return axiosInstance.post("/production", data2)

};

/**
 * get production from production ini (used for check production)
 * @param {*} data 
 * @returns 
 */
export function getProductTypeFromInput(data) {

    return axiosInstance.post("/production", data)

};
