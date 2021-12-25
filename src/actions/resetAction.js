import { axiosInstance } from "./axiosInstance";

/**
 * reset backend + reset simulation data + remove all event data
 * @returns 
 */
export function getResetAction() {

    return (dispatch) => {
        return axiosInstance.get("/reset_be")
            .then(res => {
                dispatch({ type: "REMOVE_EVENTS" })
                dispatch({ type: "RESET_RUNNING" })
            }
            );
    }
}
