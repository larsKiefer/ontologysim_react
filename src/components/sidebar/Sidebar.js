import React, { Component, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  BiMenu,
  BiUpload,
  BiLineChart,
  BiTable,
  BiSearch,
  BiDownload,
  BiInfoCircle,
} from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import colors from "../../style/theme.module.scss";

import "../../style/sidebar.css";

/**
 * sidebar viewed in simulation view
 * @returns
 */
function Sidebar() {
  //when active, the sidebar is closed
  const sidebar = useSelector((state) => state.sidebar);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const iconSize = 25;

  //highlight active element
  useEffect(() => {
    if (
      location.pathname == "/simulation/view" &&
      sidebar.activeElement != "view"
    ) {
      dispatchSidebarElement("view");
    } else if (
      location.pathname == "/simulation/kpis" &&
      sidebar.activeElement != "kpi"
    ) {
      dispatchSidebarElement("kpi");
    } else if (
      location.pathname == "/simulation/upload" &&
      sidebar.activeElement != "upload"
    ) {
      dispatchSidebarElement("upload");
    } else if (
      location.pathname == "/simulation/event" &&
      sidebar.activeElement != "event"
    ) {
      dispatchSidebarElement("event");
    } else if (
      location.pathname == "/simulation/detail" &&
      sidebar.activeElement != "detail"
    ) {
      dispatchSidebarElement("detail");
    } else if (
      location.pathname == "/simulation/info" &&
      sidebar.activeElement != "info"
    ) {
      dispatchSidebarElement("info");
    } else if (
      location.pathname == "/simulation/download" &&
      sidebar.activeElement != "download"
    ) {
      dispatchSidebarElement("download");
    }
  }, []);

  function dispatchSidebarElement(name) {
    dispatch({ type: "CHANGE_SIDEBAR", payload: { sidebarElement: name } });
  }

  var navBarClass = "pb-2 pt-2 mb-1 mt-1 d-flex pl-3 ";
  if (sidebar.active) {
    navBarClass = "pb-2 pt-2 mb-1 mt-1 d-flex justify-content-center";
  }

  //style elements when acitve or not active
  const textStyleView =
    sidebar.activeElement == "view"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleView =
    sidebar.activeElement == "view"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleLoad =
    sidebar.activeElement == "upload"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleLoad =
    sidebar.activeElement == "upload"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleEvent =
    sidebar.activeElement == "event"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleEvent =
    sidebar.activeElement == "event"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleKPI =
    sidebar.activeElement == "kpi"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleKPI =
    sidebar.activeElement == "kpi"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleDetail =
    sidebar.activeElement == "detail"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleDetail =
    sidebar.activeElement == "detail"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleInfo =
    sidebar.activeElement == "info"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleInfo =
    sidebar.activeElement == "info"
      ? { backgroundColor: colors.primaryLight }
      : {};
  const textStyleDownload =
    sidebar.activeElement == "download"
      ? "mb-0 ml-2 text-white"
      : "mb-0 ml-2 text-dark";
  const navBarStyleDownload =
    sidebar.activeElement == "download"
      ? { backgroundColor: colors.primaryLight }
      : {};

  return (
    <nav
      className={
        sidebar.active ? "sidebar active bg-primary" : "sidebar bg-primary"
      }
    >
      <div
        className="sidebar-header mt-2"
        type="button"
        onClick={() => {
          history.push("/simulation/dashboard");
          dispatchSidebarElement("");
        }}
      >
        <h4>Navigation</h4>
        <strong>Nav</strong>
      </div>
      <hr></hr>
      <ul className="list-unstyled components">
        <li className="active">
          <div
            onClick={() => {
              history.push("/simulation/upload");
              dispatchSidebarElement("upload");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleLoad}
          >
            <BiUpload
              size={iconSize}
              color={
                sidebar.activeElement == "upload" ? colors.white : colors.dark
              }
            ></BiUpload>
            {!sidebar.active && <h6 className={textStyleLoad}>Upload</h6>}
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              history.push("/simulation/view");
              dispatchSidebarElement("view");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleView}
          >
            <AiFillEye
              size={iconSize}
              color={
                sidebar.activeElement == "view" ? colors.white : colors.dark
              }
            ></AiFillEye>
            {!sidebar.active && <h6 className={textStyleView}>View</h6>}
          </div>
          <div
            onClick={() => {
              history.push("/simulation/event");
              dispatchSidebarElement("event");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleEvent}
          >
            <BiTable
              size={iconSize}
              color={
                sidebar.activeElement == "event" ? colors.white : colors.dark
              }
            ></BiTable>
            {!sidebar.active && <h6 className={textStyleEvent}>Events</h6>}
          </div>
          <div
            onClick={() => {
              history.push("/simulation/kpis");
              dispatchSidebarElement("kpi");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleKPI}
          >
            <BiLineChart
              size={iconSize}
              color={
                sidebar.activeElement == "kpi" ? colors.white : colors.dark
              }
            ></BiLineChart>
            {!sidebar.active && <h6 className={textStyleKPI}>KPIs</h6>}
          </div>
          <div
            onClick={() => {
              history.push("/simulation/detail");
              dispatchSidebarElement("detail");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleDetail}
          >
            <BiSearch
              size={iconSize}
              color={
                sidebar.activeElement == "detail" ? colors.white : colors.dark
              }
            ></BiSearch>
            {!sidebar.active && <h6 className={textStyleDetail}>Detail</h6>}
          </div>
          <div
            onClick={() => {
              history.push("/simulation/info");
              dispatchSidebarElement("info");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleInfo}
          >
            <BiInfoCircle
              size={iconSize}
              color={
                sidebar.activeElement == "info" ? colors.white : colors.dark
              }
            ></BiInfoCircle>
            {!sidebar.active && <h6 className={textStyleInfo}>Info</h6>}
          </div>
          <div
            onClick={() => {
              history.push("/simulation/download");
              dispatchSidebarElement("download");
            }}
            type="button"
            className={navBarClass}
            style={navBarStyleDownload}
          >
            <BiDownload
              size={iconSize}
              color={
                sidebar.activeElement == "download" ? colors.white : colors.dark
              }
            ></BiDownload>
            {!sidebar.active && <h6 className={textStyleDownload}>Download</h6>}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
