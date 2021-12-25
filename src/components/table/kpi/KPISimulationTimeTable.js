import React from 'react'

import DefaultTimeTable from "../DefaultTimeTable.js"
import { useSelector } from "react-redux"

//simulation time kpi table
function KPISimulationTimeTable(props) {

    const columns = React.useMemo(
        () =>  [            {
            Header: 'Time',
            columns: [
                {
                    Header: 'Time',
                    accessor: 'time',
                }
            ],
        },
        {
            Header: 'Basic',
            columns: [
                {
                    Header: 'AR',
                    accessor: 'AR',
                },
                {
                    Header: 'PR',
                    accessor: 'PR',

                }                
            ],
        },
        {
            Header: 'Other',
            columns: [
                {
                    Header: 'WIP',
                    accessor: 'WIP',
                },
                {
                    Header: 'Time',
                    accessor: 'logging_time',

                }
            ],
        },
    ]
,
[]

  )

    return (
        <div className="mt-1 "> 
              <h6 className="mb-0 text-left" style={{ fontSize: "15px" }}> All-Average
                        </h6>
            <DefaultTimeTable style={{marginRight:0,paddingRight:0}} columns={columns} data={props.data} /> 
        </div>
    )

}

export default KPISimulationTimeTable;