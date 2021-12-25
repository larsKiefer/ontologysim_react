
import React, { useState } from 'react'

import DefaultTable from "../DefaultTable.js"
import { useSelector } from "react-redux"

// queue table (events)
function QueueTable() {

    
    const filterData = React.useMemo( ()=>  "postion")

    const filterColumns = React.useMemo(
        () => [
           
                    {
                        id: 'name',
                        type: undefined
                    },
                    {                        
                        id: 'time',
                        type: 'between'

                    },
                    {
                        id: 'time_diff',
                        type: 'between'
                    },              
           
                    {
                         id: 'type_logger',
                        type: 'includesValue'
                    },
                    {
                        id: 'additional_type',
                        type: 'includesValue'
                    },
                    {                       
                        id: 'product'   ,
                        type: 'includesValue'                   
                      },
                      {                        
                        id: 'position',
                        type: 'includesValue'                       
                      },
                      {                        
                        id: 'position_info' ,
                        type: 'includesValue'                     
                      }
               
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Basic',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Time',
                        accessor: 'time',

                    },
                    {
                        Header: 'Time diff',
                        accessor: 'time_diff',
                    }
                ],
            },
            {
                Header: 'Type',
                columns: [
                    {
                        Header: 'Type',
                        accessor: 'type_logger',
                    },
                    {
                        Header: 'Additional type',
                        accessor: 'additional_type',

                    }
                ],
            },
            {
                Header: 'Additional',
                columns: [
                    {
                        Header: 'Product',
                        accessor: 'product',
                    },
                    {
                        Header: 'Postion',
                        accessor: 'position',
                    },
                    {
                        Header: 'Postion info',
                        accessor: 'position_info',
                    },
                ],
            },
        ],
        []
    )

    return (
        <div className="mt-3">
            <DefaultTable style={{ marginTop: "10px" }} name={"queue"} columns={columns} filter={filterColumns} filterColumn={filterData} />
        </div>
    )

}

export default QueueTable;
