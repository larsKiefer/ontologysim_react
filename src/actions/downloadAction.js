
import { axiosInstance } from "./axiosInstance";

/** 
*api call for getting owl file
*/
export function getOWLDownload() {

    return axiosInstance.get("/simulation/download/owl")

};
