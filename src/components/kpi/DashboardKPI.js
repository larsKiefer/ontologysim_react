import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

import { Card, ProgressBar, OverlayTrigger, Button } from "react-bootstrap";


/**
 * view summary diagramm of all and time chart for different types
 * @param {*} props 
 * @returns 
 */
function DashboardKPI(props){

    return(
        <Card className="">
            <Card.Body className="pl-2 pr-2 pt-2 ">
              <div className="d-flex align-items-end ">
                <h5 className="mb-0 text-left">{props.name}</h5>
                <p
                  className="mb-0 ml-auto text-primary"
                  type="button"
                  onClick={props.historyPush}
                  style={{ fontSize: 10 }}
                >
                  {"Details >"}{" "}
                </p>
              </div>
              <div className="row mt-1">
                <div className="col-lg-4 col-4 d-flex flex-column w-100 justify-content-center">
                  {props.kpiSummarizedList.map((element, i) => {
                   
                    return (
                      <div className="d-flex w-100 ">
                        <p
                          className="mb-0 pl-2 font-weight-bold "
                          style={{ color: props.colors[i % props.colors.length], borderLeftColor:props.colors[i % props.colors.length], borderLeftStyle:"solid", borderLeftWidth:"5px",
                          }}
                        >
                          {element.name}
                        </p>
                        <p
                          className="ml-auto mb-0 pr-2 "
                          style={{ color: props.colors[i % props.colors.length]}}
                        >
                          {element.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="col-lg-4 col-4">
                  <ResponsiveContainer width={"100%"} height={150}>
                    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Pie
                        data={props.kpiSummarizedList}
                        cx={"50%"}
                        cy={"50%"}
                        innerRadius={"80%"}
                        outerRadius={"100%"}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {props.kpiSummarizedList.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={props.colors[index % props.colors.length]}
                          />
                        ))}
                      </Pie>
                      <text
                        x={"50%"}
                        y={"50%"}
                        dy={5}
                        textAnchor="middle"
                        fill={props.colors.dark}
                      >
                        Utilization
                      </text>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-lg-4 col-4">
                    <p className="mb-0 text-left">Time</p>
                  <ResponsiveContainer width={"100%"} height={130}>
                    <AreaChart
                      data={props.timeChartObjectList}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tick={false} width={1} domain={[0, 1]}></YAxis>
                      <Tooltip />
                      {props.keyList.map((element, i) => {
                        return (
                          <Area
                            type="monotone"
                            dataKey={element}
                            stackId="1"
                            stroke={props.colors[i % props.colors.length]}
                            fill={props.colors[i % props.colors.length]}
                          />
                        );
                      })}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card.Body>
          </Card>
    )



}

export default DashboardKPI