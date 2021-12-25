import React from 'react'

import DefaultTimeTable from "../DefaultTimeTable.js"
import { useSelector } from "react-redux"

//product time kpi table
function KPIProductTimeTable(props) {

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
                Header: 'Production',
                columns: [
                    {
                        Header: 'NrP',
                        accessor: 'NrP',
                    },
                    {
                        Header: 'AOET',
                        accessor: 'AOET',
                    },
                    {
                        Header: 'WIP',
                        accessor: 'WIP',
                    },
                    {
                        Header: 'TR',
                        accessor: 'TR',
                    }
                ],
            },
            {
                Header: 'Basic',
                columns: [
                    {
                        Header: 'APTp',
                        accessor: 'APTp',
                    },
                    {
                        Header: 'AQMTp',
                        accessor: 'AQMTp',
    
                    },
                    {
                        Header: 'ATTp',
                        accessor: 'ATTp',
                    },
                    {
                        Header: 'AUPTp',
                        accessor: 'AUPTp',
                    },
                    {
                        Header: 'AUSTp_np',
                        accessor: 'AUSTnpp',
                    },
                    {
                        Header: 'AUSTp',
                        accessor: 'AUSTp',
                    },
                    {
                        Header: 'PBTp',
                        accessor: 'PBTp',
                    }
                ],
            }        
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

export default KPIProductTimeTable;