import React, { Component } from "react";
import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Simulation from "../views/Simulation";
import Home from "../views/Home";
import Eventlist from "../views/Eventlist";
import LoadSimulation from "../views/LoadSimulation";
import NoMatch from "../views/Nomatch";

import NavbarApp from "../components/Navbar";
import ChekcProductType from "../views/CheckProductType";
import CheckProduction from "../views/CheckProduction";
import Test from "../views/Test";
import Dataprotection from "../views/Dateprotection";
import DetailView from "../views/Detail";
import KPI from "../views/KPI";
import Dashboard from "../views/Dashboard";
import Impressum from "../views/Impressum";

import ScrollToTop from "../components/homepage/scrollToTop";
import DownloadSimulation from "../views/DownloadSimulation";
import InfoSimulation from "../views/InfoSimulation";
import Database from "../views/Database";

/**
 * define all routes
 * @returns 
 */
function Routes() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column ">
        <div className="flex-shrink-0">
          <NavbarApp></NavbarApp>
        </div>
        <ScrollToTop />
        <div className="flex-fill " style={{ minHeight: 0 }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/simulation/dashboard" exact component={Dashboard} />
            <Route path="/simulation/view" component={Simulation} />
            <Route path="/simulation/event" component={Eventlist} />
            <Route
              path="/simulation/event?type=machine"
              component={Eventlist}
            />
            <Route path="/simulation/event?type=queue" component={Eventlist} />
            <Route
              path="/simulation/event?type=transporter"
              component={Eventlist}
            />
            <Route
              path="/simulation/event?type=orderRelease"
              component={Eventlist}
            />
            <Route
              path="/simulation/event?type=product"
              component={Eventlist}
            />
            <Route path="/simulation/upload" component={LoadSimulation} />
            <Route path="/simulation/download" component={DownloadSimulation} />
            <Route path="/simulation/info" component={InfoSimulation} />
            <Route path="/simulation/kpis" component={KPI} />
            <Route path="/simulation/kpis?type=machine" component={KPI} />
            <Route path="/simulation/kpis?type=queue" component={KPI} />
            <Route path="/simulation/kpis?type=transporter" component={KPI} />
            <Route path="/simulation/kpis?type=simulation" component={KPI} />
            <Route path="/simulation/kpis?type=product" component={KPI} />
            <Route path="/simulation/detail" component={DetailView} />
            <Route path="/check_producttype" component={ChekcProductType} />
            <Route path="/check_production" component={CheckProduction} />
            <Route path="/impressum" component={Impressum} />
            <Route path="/data_protection" component={Dataprotection} />

            <Route path="/database" component={Database} />

            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Routes;
