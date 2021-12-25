import React from 'react'

import DefaultTableKPI from "../DefaultTableKPI.js"
import { useSelector } from "react-redux"

//transporter summery kpi table
function KPITransporterSumTable(props) {
    

    const columns = React.useMemo(
        () => [
            {
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
                        Header: 'ADOTp',
                        accessor: 'ADOTp',
                    },
                    {
                        Header: 'AUITp',
                        accessor: 'AUITp',

                    },
                    {
                        Header: 'AUSTp',
                        accessor: 'AUSTp',
                    },
                    {
                        Header: 'AUTTp',
                        accessor: 'AUTTp',
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

export default KPITransporterSumTable;