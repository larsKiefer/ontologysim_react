import React from 'react'

import DefaultTimeTable from "../DefaultTimeTable.js"
import { useSelector } from "react-redux"

//transporter time kpi table
function KPITransporterTimeTable(props) {

    const columns = React.useMemo(
        () => [
            {
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
              <h6 className="mb-0 text-left" style={{ fontSize: "15px" }}> All-Average
                        </h6>
            <DefaultTimeTable style={{marginRight:0,paddingRight:0}} columns={columns} data={props.data} /> 
        </div>
    )

}

export default KPITransporterTimeTable;