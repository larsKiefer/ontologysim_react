import React from 'react'

import DefaultTableKPI from "../DefaultTableKPI.js"
import { useSelector } from "react-redux"

//simulation summary kpi table
function KPISimulationSumTable(props) {
    
    const columns = React.useMemo(
        () =>   [            {
            Header: 'Queuename',
            columns: (Object.keys(props.data[0])).map(element  => {return {
                Header: element,
                accessor: element,
            }
        }),
        }       
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