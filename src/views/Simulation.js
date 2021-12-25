import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/Sidebar";

import "../style/sidebar.css";
import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import PlayStopElement from "../components/PlayStopCard";
import Production from "../components/simulation/Production";
import EventViewCard from "../components/simulation/EventViewCard";
import FinishedFlashMessage from "../components/modals/FinishedFlashMessage";

/**
 * view simulation (production visualisation)
 * @param {*} props 
 * @returns 
 */
function Simulation(props) {
   
  const productionState = useSelector(state => state.production)  

  const productionState2 = productionState.index !=undefined ? productionState.productionList[productionState.index] : undefined
  
  const simulation = <Production data={productionState2}></Production>
 
  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Simulation"></SidebarToggleButton>
          </div>
          <div className="row">
            <FinishedFlashMessage></FinishedFlashMessage>
          </div>

          <div className="mt-2">
            <PlayStopElement></PlayStopElement>
          </div>
          <div className="mt-2">
            <EventViewCard></EventViewCard>
          </div>
          <div >
            {simulation}

          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Simulation);
