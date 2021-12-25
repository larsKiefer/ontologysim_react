import React from 'react'

import DefaultTableKPI from "../DefaultTableKPI.js"
import { useSelector } from "react-redux"

//simulation summary kpi table
function KPISimulationSumTable(props) {
    

    const columns = React.useMemo(
        () =>  [            {
            Header: 'Name',
            columns: [
                {
                    Header: 'Name',
                    accessor: 'name',
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
            <DefaultTableKPI style={{marginRight:0,paddingRight:0}} columns={columns} data={props.data} /> 
        </div>
    )

}

export default KPISimulationSumTable;