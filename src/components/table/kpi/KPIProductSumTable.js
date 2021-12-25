import React from 'react'

import DefaultTableKPI from "../DefaultTableKPI.js"
import { useSelector } from "react-redux"

//product summary kpi table
function KPIProductSumTable(props) {
    

    const columns = React.useMemo(
        () =>  [            {
            Header: 'Name',
            columns: [
                {
                    Header: 'Name',
                    accessor: 'ProductType',
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
            <DefaultTableKPI style={{marginRight:0,paddingRight:0}} columns={columns} data={props.data} /> 
        </div>
    )

}

export default KPIProductSumTable;