import React,{Component,useState}  from 'react';
import { withRouter } from "react-router-dom";
import {Container,Row} from "react-bootstrap";

import { useDispatch } from 'react-redux'
import Sidebar from "../components/sidebar/Sidebar"

import "../style/sidebar.css"
import SidebarToggleButton from '../components/sidebar/SidbarToggleButton';
import DetailTable from '../components/table/event/DetailTable';
import PlayStopElementAdvanced from '../components/PlayStopCardAdvanced';
import NoSelection from '../components/detail/NoSelection';
import FinishedFlashMessage from '../components/modals/FinishedFlashMessage';

/**
 * simulation detail view
 * @param {*} props 
 * @returns 
 */
function DetailView(props){
  
    const [selectedElement, setSelectedElement] = useState({})

    const selectElementCallback = React.useCallback((type)=>{setSelectedElement(type)},[])
   
    return (
        <div className="containter-fulid">
         
        <div className="wrapper ">
            
            <Sidebar></Sidebar>
        
            <div className="container-fluid">

                    <div className="row">
                        <SidebarToggleButton name="Detail"></SidebarToggleButton>
                    </div>
                    <div className="row">
                        <FinishedFlashMessage></FinishedFlashMessage>
                    </div>

                    <div className="mt-2" >
                       <PlayStopElementAdvanced selectElement={selectElementCallback}></PlayStopElementAdvanced>
                    </div>
                    <div className="mt-2" >
                        <div className="col-12">
                            <h1>Still in the making</h1>
                        </div>
                    </div>
                    {Object.entries(selectedElement).length!=0 ?
                        <div className="row mt-2">
                            <div className="col-12 col-lg-6">
                                <DetailTable></DetailTable>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row bg-info" style={{height:"300px"}}>

                                </div>
                                <div className="row bg-primary">
                                        
                                </div>
                            </div>
                            
                        </div>
                    :
                        <div className="row">
                            <div className="col-12 ">
                                <NoSelection></NoSelection>
                            </div>
                        </div>
                    }
            
            </div>
        </div>
    </div>
    );

}

export default withRouter(DetailView);