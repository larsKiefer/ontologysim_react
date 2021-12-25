import { Card } from "react-bootstrap";

import SidebarToggleButton from "../components/sidebar/SidbarToggleButton";
import Sidebar from "../components/sidebar/Sidebar";
import colors from "../style/theme.module.scss";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { AiFillEye, AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaPause, FaPlay } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { getResetAction } from "../actions/resetAction";

import {
  BiMenu,
  BiUpload,
  BiLineChart,
  BiTable,
  BiSearch,
  BiDownload,
  BiInfoCircle,
} from "react-icons/bi";

/** view simulation dashboard, show all possebilities + reset fe and backend + view simulation state */
function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const eventState = useSelector((state) => state.event);
  const simulationState = useSelector((state) => state.simulation);

  return (
    <div className="containter-fulid">
      <div className="wrapper ">
        <Sidebar></Sidebar>

        <div className="container-fluid">
          <div className="row">
            <SidebarToggleButton name="Dashboard"></SidebarToggleButton>
          </div>
          <div className="row mt-3 ">
            <div className="col-12">
              <h4 className="text-left mb-0">Overview</h4>
              <p className="text-left mb-0">
                Available features for interaction with the ontologysim api
              </p>
            </div>
          </div>
          {/**view all possebilities, options */}
          <div className="row  ">
            <div
              className="col-lg-6 mt-md-3 mt-3 col-md-6  col-12 col-xl-4 d-flex align-items-stretch"
              onClick={() => history.push("/simulation/upload")}
            >
              <DashboardCard
                color={colors.primary}
                title={"Upload"}
                description={"Load ini-files and start simulation"}
                icon={<BiUpload size={37} color={colors.primary}></BiUpload>}
              ></DashboardCard>
            </div>
            <div
              className="col-lg-6 mt-md-3 mt-2 col-md-6 col-12 col-xl-4 d-flex align-items-stretch"
              onClick={() => history.push("/simulation/view")}
            >
              <DashboardCard
                color={colors.primaryLight}
                title={"View"}
                description={"Graphic view of the simulation"}
                icon={
                  <AiFillEye size={40} color={colors.primaryLight}></AiFillEye>
                }
              ></DashboardCard>
            </div>
            <div
              className="col-lg-6 mt-lg-3 mt-2 col-md-6 col-12 col-xl-4  d-flex align-items-stretch"
              onClick={() => history.push("/simulation/event")}
            >
              <DashboardCard
                color={colors.info}
                title={"Events"}
                description={"View events of simulation run"}
                icon={<BiTable size={37} color={colors.info}></BiTable>}
              ></DashboardCard>
            </div>
            <div
              className="col-lg-6 mt-lg-3 mt-2 col-md-6 col-12 col-xl-4  d-flex align-items-stretch"
              onClick={() => history.push("/simulation/kpis")}
            >
              <DashboardCard
                color={colors.infoLight}
                title={"KPIs"}
                description={"View KPIs of simulation run"}
                icon={
                  <BiLineChart size={37} color={colors.infoLight}></BiLineChart>
                }
              ></DashboardCard>
            </div>
            <div
              className="col-lg-6 mt-lg-3 mt-2 col-md-6 col-12 col-xl-4  d-flex align-items-stretch"
              onClick={() => history.push("/simulation/detail")}
            >
              <DashboardCard
                color={colors.wbkBlueLight}
                title={"Detail"}
                description={"View Detail of simulation object"}
                icon={
                  <BiSearch size={37} color={colors.wbkBlueLight}></BiSearch>
                }
              ></DashboardCard>
            </div>
            <div
              className="col-lg-6 mt-lg-3 mt-2 col-md-6 col-12 col-xl-4  d-flex align-items-stretch"
              onClick={() => history.push("/simulation/download")}
            >
              <DashboardCard
                color={colors.wbkBlueExtraLight}
                title={"Download"}
                description={"Download options for the simulation"}
                icon={
                  <BiDownload
                    size={37}
                    color={colors.wbkBlueExtraLight}
                  ></BiDownload>
                }
              ></DashboardCard>
            </div>

            <div
              className="col-lg-6 mt-lg-3 mt-2 col-md-6 col-12 col-xl-4  d-flex align-items-stretch"
              onClick={() => history.push("/simulation/info")}
            >
              <DashboardCard
                color={colors.secondary}
                title={"Info"}
                description={"Informations regarinding the simulation"}
                icon={
                  <BiInfoCircle
                    size={37}
                    color={colors.secondary}
                  ></BiInfoCircle>
                }
              ></DashboardCard>
            </div>
          </div>

          <hr className="mt-4"></hr>
        {/**view simulation state*/}
          <div className="row mt-2 ">
            <div className="col-12">
              <h4 className="text-left mb-0">Simulation status</h4>
              <p className="text-left mb-0">Current status of simulation </p>
            </div>
            <div className="col-12 mt-3">
              <Card>
                <Card.Header>
                  <h6 className="mb-0 text-left">Simulation load</h6>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-left">
                        {simulationState.alreadyStarted ? (
                          <BsCheckCircle color={colors.primary}></BsCheckCircle>
                        ) : (
                          <BsXCircle color={colors.primary}></BsXCircle>
                        )}{" "}
                        Simulation started{" "}
                      </h6>
                      <h6 className="text-left">
                        {simulationState.run ? (
                          <BsCheckCircle color={colors.primary}></BsCheckCircle>
                        ) : (
                          <BsXCircle color={colors.primary}></BsXCircle>
                        )}{" "}
                        Simulation running
                      </h6>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-left">Event: {eventState.nrEvent}</h6>
                      <h6 className="text-left">Time: {eventState.time}</h6>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <hr className="mt-4"></hr>
        
        {/**reseting backend and frontend*/}
          <div className="row mt-2 ">
            <div className="col-md-6">
              <h4 className="text-left mb-0">Restart Backend</h4>
              <p className="text-left mb-0">
                Restart Backend and reset ontology{" "}
              </p>
              <Button
                className="btn-sm d-flex align-items-center mt-3 mb-3"
                onClick={() => dispatch(getResetAction())}
              >
                <AiOutlineReload
                  className="mr-2"
                  color={colors.white}
                ></AiOutlineReload>{" "}
                Reset BE
              </Button>
            </div>

            <div className="col-md-6">
              <h4 className="text-left mb-0">Reload Frontend</h4>
              <p className="text-left mb-0">Clearing all redux states </p>
              <Button
                className="btn-sm d-flex align-items-center mb-3 mt-3"
                onClick={() => window.location.reload()}
              >
                <AiOutlineReload
                  className="mr-2"
                  color={colors.white}
                ></AiOutlineReload>{" "}
                Reload FE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard(props) {
  return (
    <Card className="w-100 " type="submit">
      <Card.Body className="d-flex flex-row mb-0 pb-0 pt-0 mt-0 pl-0 mt-0 pr-2">
        <div
          className=" pb-3 pt-3 d-flex  justify-content-center"
          style={{ width: "100px", backgroundColor: props.color }}
        >
          <span
            className=" d-flex justify-content-center align-items-center"
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: colors.white,
              borderRadius: "50%",
              display: "inline-block",
            }}
          >
            {props.icon}
          </span>
        </div>
        <div className=" pb-2 pt-2 pl-2 pr-2 w-100 bg-white d-flex flex-column  justify-content-center ">
          <h5 className="mb-0 w-100 text-left text-uppercase align-self-center">
            {props.title}
          </h5>
          <p className="text-muted w-100 text-left align-self-center mb-0">
            {props.description}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Dashboard;
