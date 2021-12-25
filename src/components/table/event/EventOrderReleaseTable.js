
import React from 'react'

import DefaultTable from "../DefaultTable.js"
import { useSelector } from "react-redux"

// order release table (events)
function OrderReleaseTable() {

   const filterData = React.useMemo( ()=>  "task")

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
                    id: 'task',
                    type: 'includesValue'
                  },
                  {                    
                    id: 'number_of_parts',
                    type: 'between'
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
                  Header: 'Task',
                  accessor: 'task',
                },
                {
                  Header: 'Number of parts',
                  accessor: 'number_of_parts',
                },
          ],
        },
      ],
      []
    )
    
   

    return (
        <div className="mt-3">
            <DefaultTable style={{ marginTop: "10px"}} name="orderRelease" columns={columns} filter={filterColumns} filterColumn={filterData} />
        </div>
    )

}

export default OrderReleaseTable;
