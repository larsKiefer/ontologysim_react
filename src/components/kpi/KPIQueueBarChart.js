import { useSelector } from "react-redux";
import React, {useState} from "react"
import {
  LineChart,
  AreaChart,
  ComposedChart,
  Area,
  BarChart, Bar,
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
 * bar chart vor queue kpi (summary)
 * @param {*} props 
 * @returns 
 */
function KPIQueueBarChart(props){
    const colorList = [ colors.danger,colors.dark,colors.info, colors.warning,colors.secondary]
 
    return(
        <Card>           
            <Card.Body className="pt-2">
              <div className="d-flex">
                <h6 className="mb text-left">{props.name}</h6>
                <p className="text-muted mb-0 ml-2 align-self-center" style={{fontSize:10}}>{props.tooltip}</p>
            </div>

            <ResponsiveContainer width={"99%"} height={300}>
              <BarChart               
                data={props.data}
                margin={{top: 10, right: 0, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
               
                  <Bar dataKey={"FillLevel"}  fill={colors.primary} />
                
                  
             
              </BarChart>
            </ResponsiveContainer>
          
            
            </Card.Body>
          </Card>

    )
}

export default KPIQueueBarChart