

import  {MdReportProblem} from "react-icons/md"
import colors from "../../style/theme.module.scss";

/**
 * warning card in no selection in detail view
 * @returns 
 */
function NoSelection(){


    return(
        <div className="mt-5 pt-5">            
             <MdReportProblem className="" color={colors.warning} size={70}></MdReportProblem>
             <h5>Select object and start simulation</h5>
             <p>Check if your simulation is running and if an object is selected</p>  
        </div>
       
    )

}

export default NoSelection