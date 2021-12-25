import React, { useMemo } from "react";
import { CgMathPercent } from "react-icons/cg";
import { useSelector } from "react-redux";

/**
 * viewing current event in one row
 * @param {*} props
 * @returns
 */
function EventViewCard(props) {
  const eventState = useSelector((state) => state.event);
  const productionState = useSelector((state) => state.production);

  /**
   * get data, return view
   */
  const eventName = useMemo(() => {
    if (productionState.index == undefined) {
      return (
        <div className="">
          <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
            -
          </h6>
        </div>
      );
    } else if (eventState.event_list.length == 0) {
      return (
        <div className="">
          <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
            -
          </h6>
        </div>
      );
    } else {
      var event = undefined;
      var str = "";
      if (eventState.event_list.length > 10) {
        event =
          eventState.event_list[
            eventState.event_list.length - 10 + productionState.index
          ];
      } else {
        event = eventState.event_list[productionState.index];
      }
      str +=
        ": event" +
        ": " +
        event.name +
        "; time: " +
        Math.round(event.time) +
        "; timeDiff: " +
        Math.round(event.time_diff) +
        "; ";

      Object.entries(event).forEach(([key, value]) => {
        if (
          value != "" &&
          key != "name" &&
          key != "time" &&
          key != "time_diff" &&
          key != "type_logger"
        ) {
          str += key + ": " + value + "; ";
        }
      });

      return (
        <div className="d-flex">
          <h6
            className="mb-0 text-left font-weight-bold text-uppercase"
            style={{ fontSize: "10px" }}
          >
            {event.type_logger}
          </h6>
          <h6 className="mb-0 text-left" style={{ fontSize: "10px" }}>
            {str}
          </h6>
        </div>
      );
    }
  }, [productionState, eventState]);

  return (
    <div className="card w-100 pl-1 pr-1 pt-1 pb-1">
      <div className="row  ">
        <div className="col-12 d-flex">{eventName}</div>
      </div>
    </div>
  );
}

export default EventViewCard;
