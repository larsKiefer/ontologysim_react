import axios from "axios";

/**
 * creating axios instance with baseURL
 */
export const axiosInstance = axios.create({baseURL:"http://localhost:5000/",withCredentials:true,    
    
  })