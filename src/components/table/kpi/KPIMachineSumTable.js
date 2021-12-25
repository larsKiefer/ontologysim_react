import React from 'react'

import DefaultTableKPI from "../DefaultTableKPI.js"
import { useSelector } from "react-redux"

//machine summary kpi table
function KPIMachineSumTable(props) {
    

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
                    Header: 'A',
                    accessor: 'A',
                },
                {
                    Header: 'ADOTp',
                    accessor: 'ADOTp',

                },
                {
                    Header: 'AE',
                    accessor: 'AE',
                },
                {
                    Header: 'APTp',
                    accessor: 'APTp',
                },
                {
                    Header: 'AUBLTp',
                    accessor: 'AUBLTp',
                },
                {
                    Header: 'AUBTp',
                    accessor: 'AUBTp',
                },
                {
                    Header: 'AUITp',
                    accessor: 'AUITp',
                },
                {
                    Header: 'AUPTp',
                    accessor: 'AUPTp',
                },
                {
                    Header: 'AUSTTp',
                    accessor: 'AUSTTp',
                },
                {
                    Header: 'AUSTp',
                    accessor: 'AUSTp',
                },
                {
                    Header: 'E',
                    accessor: 'E',
                },               
                {
                    Header: 'NEE',
                    accessor: 'NEE',
                },
                {
                    Header: 'OEE',
                    accessor: 'OEE',
                },
                {
                    Header: 'PBTp',
                    accessor: 'PBTp',
                },
                {
                    Header: 'PRIp',
                    accessor: 'PRIp',
                },
                {
                    Header: 'SeRp',
                    accessor: 'SeRp',
                },
                {
                    Header: 'TE',
                    accessor: 'TE',
                },
                {
                    Header: 'UE',
                    accessor: 'UE',
                }
            ],
        },
        {
            Header: 'Defect',
            columns: [
                {
                    Header: 'CMTp',
                    accessor: 'CMTp',
                },
                {
                    Header: 'FE',
                    accessor: 'FE',

                },
                {
                    Header: 'TTFp',
                    accessor: 'TTFp',

                },
                {
                    Header: 'TTRp',
                    accessor: 'TTRp',

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

export default KPIMachineSumTable;