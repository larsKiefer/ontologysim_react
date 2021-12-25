import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import Sidebar from "../components/sidebar/Sidebar";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stage, Layer, Rect, Group, Circle } from "../konva/react-konva";

import MachineInformationCard from "../components/information/MachineInformationCard";
import QueueInformationCard from "../components/information/QueueInformationCard";
import TransporterInformationCard from "../components/information/TransporterInformationCard";

/**
 * view info simulation (hover konva elements)
 * @param {*} props 
 * @returns 
 */
function InfoSimulation(props) {
  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Information"></SidebarToggleButton>
          </div>
          <div className="row">
            <div className="col-lg-6 mt-4 ">
              <div className="">
                <h4 className="text-left">Machine</h4>
              </div>
              <MachineInformationCard></MachineInformationCard>
            </div>
            <div className="col-lg-6 mt-4 ">
              <div className="">
                <h4 className="text-left">Transporter</h4>
              </div>
              <TransporterInformationCard></TransporterInformationCard>
            </div>
            <div className="col-lg-6 mt-4 ">
              <div className="">
                <h4 className="text-left">Queue</h4>
              </div>
              <QueueInformationCard></QueueInformationCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSimulation;
