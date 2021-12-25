import React from 'react'

import DefaultTimeTable from "../DefaultTimeTable.js"
import { useSelector } from "react-redux"

//queue summary kpi table
function KPIQueueTimeTable(props) {

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
            columns: (Object.keys(props.columns[0])).map(element  => {return {
                Header: element,
                accessor: element,
            }
        
        })}
        
    ]
,
[]

  )

    return (
        <div className="mt-1 "> 
              <h6 className="mb-0 text-left" style={{ fontSize: "15px" }}> Fill-Level
                        </h6>
            <DefaultTimeTable style={{marginRight:0,paddingRight:0}} columns={columns} data={props.data} /> 
        </div>
    )

}

export default KPIQueueTimeTable;