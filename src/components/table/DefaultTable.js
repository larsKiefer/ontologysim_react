import {
    useTable,
    useFilters,
    useSortBy,
    useGlobalFilter,
    useAsyncDebounce,
    usePagination,
} from "react-table";
import BTable from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import React from "react";
import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import {IoMdCloseCircle} from "react-icons/io"
import colors from "../../style/theme.module.scss";
import FilterModal from "../modals/FilterModal";
import { propTypes } from "react-bootstrap/esm/Image";

function DefaultTable({name, columns,filter,filterColumn } ) {
    
    const dispatch = useDispatch()
    // Use the state and functions returned from useTable to build your UI
    
    const eventState = useSelector(state => state.event);
    const data = React.useMemo(()=>eventState.event_list.filter(row=> row[filterColumn]!=""),[eventState])
    const filterState = useSelector(state => state.filter);
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setFilter,
        setAllFilters,
        state: { pageIndex, pageSize, filters },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 25,filters: filterState[name].map(element=> { return {id: element.column, value: element.value}}) },
        },
        useFilters,
        useSortBy,
        usePagination
    );
  
    const preFilteredRows = [...data] 

    const [modalShow, setModalShow] = React.useState(false);

    const sidebar = useSelector((state) => state.sidebar);
    var tableWith = React.useMemo( ()=> {return sidebar.active ? {maxWidth: window.innerWidth-115, overflowX: "auto"} : {maxWidth: window.innerWidth-195, overflowX: "auto"}} ,[sidebar, window.innerWidth])
    
   //close filter element
    function close(columnID){
        
        dispatch({type:"REMOVE_FILTER", payload:{ "columnID":columnID,"table":name }})
          
    }
    
    // show filter elements
    const loadFilters = React.useMemo( () => {
   
        var elements = []
       
            
        headerGroups.forEach(headerGroup => {
            headerGroup.headers.forEach(column => {
                var filterFound=false
                filterState[name].forEach( elementList => {

                    if(column.id == elementList["column"] ){
                        filterFound=true
                        column.filter = elementList["type"]                        
                        column.setFilter(elementList["value"])                            
                        elements.push(<span                            
                            className="badge badge-pill badge-info"
                        >{column.id + " ["+ elementList["value"] + "]"} <IoMdCloseCircle type="button" onClick={()=>{close(column.id)}}></IoMdCloseCircle></span>)
                        }
                    
                })
                if(!filterFound){
                    if(column.filter){
                        column.setFilter(undefined)
                    }
                }
            })
        })
        return elements
    },[filterState])
    
    // Render the UI for your table
    return (
        <div>
            {modalShow &&
            <FilterModal
                name={name}
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                headergroups={headerGroups}
                rows={rows}
                prefilteredrows = {preFilteredRows}
                filtered = {filterState}
                filter={filter}
            ></FilterModal>
            }

            <div className="w-100" style={tableWith}>
                {/*filterObject */}
                <div className="d-flex mb-2">
                    <div>
                        <span
                            type="button"
                            className="badge badge-pill badge-secondary"
                            onClick={() => setModalShow(true)}
                        >
                            <FaFilter></FaFilter> Filter
            </span>
                        {loadFilters}
                    </div>

                </div>
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
                {/*pagination */}
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
    );
}

export default DefaultTable;
