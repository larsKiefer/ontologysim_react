import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  LineChart,
  AreaChart,
  ComposedChart,
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
import SummaryKPICard from "./SummaryKPICard";
import { ImTable } from "react-icons/im";
import { BsCardList } from "react-icons/bs";

/**
 * kpi time chart
 * @param {*} props
 * @returns
 */
function KPIChart(props) {
  const colorList = [
    colors.danger,
    colors.dark,
    colors.info,
    colors.warning,
    colors.secondary,
  ];

  const keys = props.data.length > 0 ? Object.keys(props.data[0]) : [];

  const opacity = {};

  // change opacity when hovering over line
  keys.forEach((element) => {
    opacity[element] = 1;
  });
  const [state, setState] = useState({
    opacity: opacity,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = state;
    Object.entries(opacity).forEach(([key, value]) => (opacity[key] = 0.4));

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = state;
    Object.entries(opacity).forEach(([key, value]) => (opacity[key] = 1));

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  return (
    <Card>
      <Card.Body className="pt-2">
        <div className="d-flex">
          <h6 className="mb text-left">{props.name}</h6>
          <p
            className="text-muted mb-0 ml-2 align-self-center"
            style={{ fontSize: 10 }}
          >
            {props.tooltip}
          </p>
        </div>
        {keys.length > 0 ? (
          <ResponsiveContainer width={"99%"} height={300}>
            <ComposedChart
              data={props.data}
              margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={"all" + "color"}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors.primary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors.primary}
                    stopOpacity={0}
                  />
                </linearGradient>

                {Object.keys(props.data[0]).map((element, i) => {
                  if ((element != "name") & (element != "all")) {
                    return (
                      <linearGradient
                        id={element + "color"}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colorList[i - 2]}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colorList[i - 2]}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    );
                  }
                })}
              </defs>

              <XAxis dataKey="name" />

              <YAxis />

              <CartesianGrid strokeDasharray="3 3" />
              <Legend
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <Tooltip />

              <Area
                type="monotone"
                dataKey={"all"}
                strokeOpacity={state.opacity["all"]}
                stroke={colors.primary}
                strokeWidth={4}
                fillOpacity={0.85}
                fill={"url(#" + "all" + "color)"}
              />

              {Object.keys(props.data[0]).map((element, i) => {
                if (element != "name" && element != "all") {
                  return (
                    <Line
                      type="monotone"
                      strokeOpacity={state.opacity[element]}
                      dataKey={element}
                      strokeWidth={2}
                      dot={false}
                      stroke={colorList[i - 2]}
                    />
                  );
                }
              })}
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width={"99%"} height={300}>
            <ComposedChart
              data={props.data}
              margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
            >
              <defs></defs>

              <XAxis dataKey="name" />

              <YAxis />

              <CartesianGrid strokeDasharray="3 3" />
              <Legend
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <Tooltip />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default KPIChart;
