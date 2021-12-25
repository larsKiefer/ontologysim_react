import { useSelector } from "react-redux";

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, ProgressBar, OverlayTrigger, Button } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import colors from "../../style/theme.module.scss";
import ReactTooltip from "react-tooltip";

import { ImTable } from "react-icons/im";
import { BsCardList } from "react-icons/bs";

/**
 * progress bar for different kpi type
 * @param {*} props 
 * @returns 
 */
function SummaryKPICard(props) {
  
  return (
    <Card className="ml-0 mr-0 h-100">
      <Card.Body className="pt-2 pb-2 text-left">
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex">
            <h6 className="mb text-left">{props.name}</h6>
            <p
              className="text-muted mb-0 ml-2 align-self-center"
              style={{ fontSize: 10 }}
            >
              {props.type}
            </p>
          </div>
          <div className="ml-auto ">
            <p className="mb-0  pt-0  d-flex" data-tip={props.toolbar}>
              <AiOutlineQuestionCircle
                className="align-self-center "
                color={colors.dark}
              ></AiOutlineQuestionCircle>
            </p>
            <ReactTooltip place="bottom" type="dark" />
          </div>
        </div>

        {/*progress bars all*/}
        <div className="mt-1 d-flex flex-row">
          <p
            className="mb-0 text-left font-weight-bold"
            style={{ fontSize: 13, width: "30px" }}
          >
            {" "}
            All{" "}
          </p>
          <div className="progress w-100 align-self-center">
            {props.unit == "percentage" ? (
              <div
                className="progress-bar bg-primary d-flex text-left pl-2"
                role="progressbar"
                style={{
                  width: Number((props.data["all"] * 100).toFixed(2)) + "%",
                  fontSize: 13,
                }}
                aria-valuenow={Number((props.data["all"] * 100).toFixed(2))}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {" "}
              </div>
            ) : (
              <div
                className="progress-bar bg-primary d-flex text-left pl-2"
                role="progressbar"
                style={{
                  width:
                    (Number(props.data["all"].toFixed(2)) /
                      Math.max(...Object.values(props.data))) *
                      100 +
                    "%",
                  fontSize: 13,
                }}
                aria-valuenow={Number(props.data["all"].toFixed(2))}
                aria-valuemin="0"
                aria-valuemax={Math.max(...Object.values(props.data))}
              >
                {" "}
              </div>
            )}
          </div>
          {props.unit == "percentage" ? (
            <p
              className="mb-0 text-right font-weight-bold"
              style={{ fontSize: 13, width: "40px" }}
            >
              {Number((props.data["all"] * 100).toFixed(2))}%
            </p>
          ) : (
            <p
              className="mb-0 text-right font-weight-bold"
              style={{ fontSize: 13, width: "40px" }}
            >
              {Number(props.data["all"].toFixed(2))}
            </p>
          )}
        </div>

        {/*progress bars objects (not all)*/}
        {Object.entries(props.data).map(([key, value], i) => {
          if (key != "all") {
            return (
              <div className="mt-1 d-flex flex-row">
                <p
                  className="mb-0 text-left  "
                  style={{ fontSize: 10, width: "30px" }}
                >
                  {key}
                </p>
                <div
                  className="progress w-100 align-self-center"
                  style={{ height: "10px" }}
                >
                  {props.unit == "percentage" ? (
                    <div
                      className="progress-bar bg-dark d-flex text-left pl-2"
                      role="progressbar"
                      style={{
                        height: "10px",
                        width: Number((value * 100).toFixed(2)) + "%",
                      }}
                      aria-valuenow="100"
                    >
                      {" "}
                    </div>
                  ) : (
                    <div
                      className="progress-bar bg-dark d-flex text-left pl-2"
                      role="progressbar"
                      style={{
                        height: "10px",
                        width:
                          (Number(value.toFixed(2)) /
                            Math.max(...Object.values(props.data))) *
                            100 +
                          "%",
                      }}
                      aria-valuenow={Number(value.toFixed(2))}
                      aria-valuemin="0"
                      aria-valuemax={Math.max(...Object.values(props.data))}
                    >
                      {" "}
                    </div>
                  )}
                </div>
                {props.unit == "percentage" ? (
                  <p
                    className="mb-0 text-right"
                    style={{ fontSize: 10, width: "40px" }}
                  >
                    {Number((value * 100).toFixed(2))}%
                  </p>
                ) : (
                  <p
                    className="mb-0 text-right"
                    style={{ fontSize: 10, width: "40px" }}
                  >
                    {Number(value.toFixed(2))}
                  </p>
                )}
              </div>
            );
          }
        })}
      </Card.Body>
    </Card>
  );
}

export default SummaryKPICard;
