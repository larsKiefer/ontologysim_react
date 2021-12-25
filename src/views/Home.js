import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

import { withRouter, useHistory } from "react-router-dom";
import {ReactComponent as Icon} from '../assets/icons/ontologysimOverview.svg';
import LogoName from '../assets/icons/ontologysimOverview.svg'

import Footer from "../components/homepage/footer"

import KPIImage from "../assets/image/kpi.PNG"
import OntologyStructureImage from "../assets/image/ontologyStructure.png"
import SoftwareStructureImage from "../assets/image/softwareStructure.png"
import OntologyVisualizationImage from "../assets/image/ontologyVisualization.PNG"

import {FaReact,FaPython} from "react-icons/fa"
import useWindowDimensions from '../components/useWindowDimensions';
import colors from "../style/theme.module.scss";
/**
 * home page for ontologysim
 */
function Home() {
    const history = useHistory();
    
    const { height, width } = useWindowDimensions();
   
    return (
        <div>
            <div className="container-fluid bg-primary pb-5 pt-5 d-none d-lg-block "  >
                
                <div className="row h-100 mt-5 mb-5  align-items-center">
                    <div className="col-12  d-flex align-items-center ">
                        <div className="container ">
                            <div className="row   ">
                                <div className="col-12 ">
                                   
                                    <div className= "card text-center pb-5 pt-5 pr-3 pl-5 justify-content-center row d-flex flex-row bg-white ">
                                    <div className="col-md-6 align-self-center">
                                            
                                            <h1 className="jumbotron-heading text-left text-dark  ">Fast, flexible ontology-based production simulation based on Python and React. </h1>
                                            
                                            <p className="lead text-dark text-left">Including live visualization and KPI dashboard</p>
                                            <div className="mt-2 d-flex justify-content-start">
                                                <a href="#Overview" className="btn btn-dark mr-2">Overview</a>
                                                <a href="#Video" className="btn btn-primary ml-2">Functionality</a>
                                            </div>
                                    </div>
                                    <div className="pr-3 col-md-6">
                                        
                                        <img src={LogoName} width="90%"></img>
                                    </div>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
            <div className="container-fluid bg-primary pb-5 pt-5 d-lg-none d-block"  >
               
                <div className="row h-100 mt-5 mb-5  align-items-center">
                    <div className="col-12  d-flex align-items-center ">
                        <div className="container ">
                            <div className="row   ">
                                <div className="col-12 ">
                                    <div className="card text-center pb-5 pt-5 pr-2 pl-2">
                                       
                                        <h3 className="jumbotron-heading">Fast, flexible ontology-based production simulation based on Python & React. </h3>
                                        <p className="lead text-muted">Including live visualization and KPI dashboard</p>
                                        <div className="mt-2">
                                            <a href="#Overview" className="btn btn-primary mr-2">Overview</a>
                                            <a href="#Video" className="btn btn-secondary ml-2">Function</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-3 pt-2">

                <div className="row pb-5 pt-5 border-bottom " id="Overview">
                    <div className="col-md-6 d-flex align-self-center flex-column">
                        <h3 className="justify-content-start text-left">
                            Ontologybased simulation
                    </h3>
                        <ul>                        
                            <li>
                                <p className="text-left mb-0">
                                    High degree of freedom in the creation of the simulation from line production to matrix production
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Pausable and storable simulation
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Merge and split of production parts (coming soon)
                            </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Based on python and owlready2.0
                                </p>
                            </li>

                        </ul>

                    </div>
                    <div className="col-md-6   align-self-center ">
                    <img src={OntologyStructureImage} width={"100%"}></img>
                    </div>
                </div>
                <div className="row pb-5 pt-5 border-bottom">
                    <div className="col-md-6  d-none d-md-block ">
                        <img src={KPIImage} width={"100%"}></img>
                    </div>
                    <div className="col-md-6 d-flex align-self-center flex-column">
                        <h3 className="justify-content-start  text-left">
                            KPI-Analyse
                    </h3>
                        <ul>
                            <li>
                                <p className="text-left mb-0">
                                    Output of machine, transporter and product Kpis, in total over 30 KPIs 
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Calculation of KPIs per production run and in freely selectable interval steps
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Saving the KPIs in csv, png
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Visualization of KPIs in charts via React
                                </p>
                            </li>

                        </ul>

                    </div>
                    <div className="col-md-6 d-md-none d-lg-none d-xl-none ">
                        <img src={KPIImage} width={"100%"}></img>
                    </div>


                </div>
                <div className="row pb-5 pt-5  " >
                    <div className="col-md-6 d-flex align-self-center flex-column">
                        <h3 className="justify-content-start text-left">
                        Visualization of the simulation
                    </h3>
                        <ul>
                            <li>
                                <p className="text-left mb-0">
                                    Step-by-step analysis of the simulation for the evaluation of the control logic
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Rewind (coming soon) and fast forward the discrete simulation
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Sorting and filtering of the last decisions (events)
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Based on React
                                </p>
                            </li>

                        </ul>

                    </div>
                    <div className="col-md-6   align-self-center ">
                       <img src={OntologyVisualizationImage} width={"100%"}></img>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5 pt-5 bg-light " id="Video">
                <div className="row">
                    <div className="col-12">
                        <div className="container ">
                            <div className="row pb-3 pt-3">
                                <div className="col-12 d-flex align-self-center flex-column">
                                    <h3 className="">
                                        Functionality
                                    </h3>
                                    <p>
                                        The ontologysim is a full stack development based on React, Flask and owlready2.
                                    </p>                                    
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                <div className=" row pb-5 pt-3 border-bottom">
                    <div className="col-md-6  d-none d-md-block ">
                        <img src={SoftwareStructureImage} width={"100%"}></img>
                    </div>
                    <div className="col-md-6 d-flex align-self-center flex-column">
                        <h3 className="justify-content-start  text-left">
                            Software structure
                    </h3>
                        <ul>
                            <li>
                                <p className="text-left mb-0">
                                    The python simulation can be used independently from React. The logger and kpi data are then output as a csv file
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                    Ajax calls are used to visualize data in the browser and simulation runs can be started
                                </p>
                            </li>
                            <li>
                                <p className="text-left mb-0">
                                The entire simulation calculation is performed in the ontology
                                </p>
                            </li>                        

                        </ul>

                    </div>
                    <div className="col-md-6 d-md-none d-lg-none d-xl-none ">
                        <img src={SoftwareStructureImage} width={"100%"}></img>
                    </div>


                </div>
            </div>
            </div>
            <div className="container-fluid pb-5 pt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex flex-column">
                                    <h3 className="">Next steps</h3>
                                    <p className="">
                                    The simulation is still under construction and new cool features are being integrated all the time. The following functionalities will be integrated soon
                                    </p>    
                                </div>
                            </div>
                            <div className=" row">
                                <div className="col-12 d-flex justify-content-center">
                                    <ul className="d-flex flex-column" >
                                 
                                        <li className=" justify-content-center ">        
                                        <p className=" mb-0 text-left">                                   
                                            Expansion of simulation visualization   
                                            </p>
                                        </li>
                                        <li>
                                            <p className=" mb-0">
                                            Detail page, where individual machines and transporters can be analyzed in detail.
                                            </p>
                                        </li>
                                        <li>
                                            <p className="text-left mb-0">
                                            Merging and Remanufacturing of products
                                            </p>
                                        </li>                        

                                    </ul>
                                 
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className="container-fluid pb-5 pt-5 bg-dark">
                <div className="row mb-4">
                    <div className="col-12">

                        <h3 className="text-white">Acess to Code</h3>
                        <h6 className="text-white ">
                            You have the desire to try the simulation

                        </h6>
                    </div>
                </div>
                <div className="row mb-4 mt-2">
                    <div className="col-3 d-none d-md-flex col-md-1 col-xl-3 ">

                    </div>
                    <div className="col-12 col-md-5  col-xl-3 ">
                        <FaReact size={50} color={"white"}></FaReact>
                        <h5 className="text-white">React</h5>
                        <button className="btn btn-primary" style={{width:"200px"}} onClick={()=> {window.location= 'https://git.scc.kit.edu/ov0653/ontologysim'}}>Get access</button>
                    </div>

                    <div className="col-12 col-md-5 col-lg-5  col-xl-3 mt-4 mt-md-0 ">
                    <FaPython size={50} color={"white"}></FaPython>
                        <h5 className="text-white">Python</h5>
                      <div className="d-flex flex-column">
                          <div>
                        <button className="btn btn-primary " style={{width:"200px"}} onClick={()=> {window.location= 'https://git.scc.kit.edu/uufrm/ontologysim_react'}}>Get access</button>
                        </div>
                        <div>
                        <button className="btn btn-info mt-2 "  style={{width:"200px"}} onClick={()=> {window.location= 'http://193.196.39.152/'}}>Dokumentation</button>
                        </div>
                        </div>
                    </div>
                    <div className="col-3 col-md-1 d-none d-md-flex  col-xl-3">

                    </div>
                   
                </div>
            </div>
            <div className="">
            <Footer></Footer> 
        </div>
        
        </div>
        
    );

}

export default withRouter(Home);