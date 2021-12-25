import {
    useTable,
    useFilters,
    useSortBy,
    useGlobalFilter,
    useAsyncDebounce,
    usePagination,
} from "react-table";
import BTable from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import React from "react";
import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import {IoMdCloseCircle} from "react-icons/io"
import colors from "../../style/theme.module.scss";
import FilterModal from "../modals/FilterModal";


//default time kpi table
function DefaultTimeTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,        
        setFilter,
        setAllFilters,        
    } = useTable(
        {
            columns,
            data,            
        },
        useFilters,
        useSortBy,
        usePagination
    );
  
    const preFilteredRows = [...data] 

    const [modalShow, setModalShow] = React.useState(false);

    const sidebar = useSelector((state) => state.sidebar);

    var tableWith = sidebar.active ? {maxWidth: window.innerWidth-141, overflowX: "auto"} : {maxWidth: window.innerWidth-220, overflowX: "auto"}
    
    // Render the UI for your table
    return (
        

            <div className="w-100" style={tableWith}>
                {/*filterObject */}       
                <BTable striped bordered hover size={"sm"} {...getTableProps()} className="" style={{ "minHeight": 0, "overflowX": "auto" }}>
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
                                            {/* Render the columns filter UI */}
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
                    {rows.map((row, i) => {
                        prepareRow(row)
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
               
            </div>
        
    );
}

export default DefaultTimeTable;
