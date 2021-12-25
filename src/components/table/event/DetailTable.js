
import React from 'react'

import DefaultTable from "../DefaultTable.js"
import { useDispatch, useSelector } from "react-redux"
import BTable from "react-bootstrap/Table";

import {
    useTable,
    useFilters,
    useSortBy,
    useGlobalFilter,
    useAsyncDebounce,
    usePagination,
} from "react-table";
import colors from "../../../style/theme.module.scss";
import {FaSortDown,FaSortUp,FaSort} from "react-icons/fa"

// table for detail, last events
function DetailTable() {

   const filterData = React.useMemo( ()=>  "task")

   const dispatch = useDispatch()
    // Use the state and functions returned from useTable to build your UI
    const filterColumn = "Task"
    const eventState = useSelector(state => state.event);
    const data = React.useMemo(()=>eventState.event_list.filter(row=> row[filterColumn]!=""),[eventState])
    const filterState = useSelector(state => state.filter);
    
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
              }                            
            ],
          },
          {
            Header: 'Additional',
            columns: [
                {                
                    Header: 'Adiitonal',
                    accessor: 'additional',
                  }                
            ],
          },
        ],
        []
      )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
  
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 25 },
        },
        useFilters,
        useSortBy,
        usePagination
    );
  
    const preFilteredRows = [...data] 

    const [modalShow, setModalShow] = React.useState(false);

    const sidebar = useSelector((state) => state.sidebar);
    var tableWith = React.useMemo( ()=> {return sidebar.active ? {maxWidth: window.innerWidth-115, overflowX: "auto"} : {maxWidth: window.innerWidth-195, overflowX: "auto"}} ,[sidebar, window.innerWidth])
    
   
  
  
    
   

    return (
        <div className="mt-3">
          
            <div>       
             
                    <BTable striped bordered hover size={"sm"} {...getTableProps()}>
                        <thead className="bg-light">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            style={{
                                                fontSize: "12px",
                                                paddingBottom: "2px",
                                                paddingTop: "2px",
                                            }}
                                        >
                                            <div className="d-flex flex-row justify-content-between">
                                                {column.render("Header")}
                                   
                                                <span>
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <FaSortDown></FaSortDown>
                                                        ) : (
                                                            <FaSortUp></FaSortUp>
                                                        )
                                                    ) : column.canSort ? (
                                                        <FaSort color={colors.secondary}></FaSort>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    style={{
                                                        fontSize: "12px",
                                                        paddingBottom: "2px",
                                                        paddingTop: "2px",
                                                    }}
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </BTable>
                    <div className="">
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {"<<"}
                        </button>{" "}
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {"<"}
                        </button>{" "}
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {">"}
                        </button>{" "}
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {">>"}
                        </button>{" "}
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <span>
                            | Go to page:{" "}
                            <input
                                type="number"
                                min={1}
                                max={pageOptions.length}
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: "100px" }}
                            />
                        </span>{" "}
                        <select
                            className="form-select form-select-sm"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[25, 50, 75, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>         
        </div>
    )

}

export default DetailTable;
