import React from 'react'

import DefaultTimeTable from "../DefaultTimeTable.js"
import { useSelector } from "react-redux"

//transporter loaction time kpi table
function KPITransporterLocationTable(props) {
    console.log(props.columns)
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
                Header: 'Lcocation',
                columns: props.columns.map(element  => {return {
                    Header: element,
                    accessor: element,
                }})
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

export default KPITransporterLocationTable;