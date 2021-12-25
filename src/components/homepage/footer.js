
import { useHistory, withRouter  } from "react-router-dom";


/**
 * footer
 */
function Footer() {

    let history = useHistory();
    

    return (
        <div className="col-12 justify-content-center d-flex flex-row">                 
            <p className="mb-0 pb-0 pt-1" style={{fontSize:"10px"}}>Kopierrecht © 2021 - wbk Institut für Produktionstechnik  - {"       "} 
            <a href="" onClick={(e) => {e.preventDefault(); history.push("/impressum")}}>
            Impressum
            </a>
              -  
            <a href="" onClick={(e) => {e.preventDefault(); history.push("/data_protection")}}>
            Datenschutz
            </a>
              </p>
            
        </div>
    );

}


export default Footer;