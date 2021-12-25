import React from "react";
import { Alert, Button } from "react-bootstrap";
import { AiOutlineSave, AiOutlineReload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../style/theme.module.scss";

/**
 * Flash message to show, when simulation is finsihed
 * @param {*} props
 * @returns
 */
function FinishedFlashMessage(props) {
  const dispatch = useDispatch();

  const layoutState = useSelector((state) => state.layout);
  const simulationState = useSelector((state) => state.simulation);

  const alertMessage = React.useMemo(() => {
    if (
      layoutState.finishFlashMessage == true &&
      simulationState.simulationFinished == true
    ) {
      return (
        <Alert
          variant="success"
          onClose={() => dispatch({ type: "TOGGLE_FINISHED_FLASH_MESSAGE" })}
          dismissible
          className="w-100"
        >
          <Alert.Heading>Simulation finished</Alert.Heading>
          <p>
            To run a new simulation run, restart Frontend or change selected
            simulation files.
          </p>
          <hr className="" />
          <div className="row">
            <div className="col-md-12  d-flex justify-content-end">
              <Button
                className="btn-sm d-flex align-items-center mr-2"
                onClick={() => {}}
              >
                <AiOutlineSave
                  className="mr-2"
                  color={colors.white}
                ></AiOutlineSave>{" "}
                Save
              </Button>

              <Button
                className="btn-sm d-flex align-items-center "
                onClick={() => window.location.reload()}
              >
                <AiOutlineReload
                  className="mr-2"
                  color={colors.white}
                ></AiOutlineReload>{" "}
                Reload FE
              </Button>
            </div>
          </div>
        </Alert>
      );
    }
  }, [layoutState.finishFlashMessage, simulationState.simulationFinished]);

  return <>{alertMessage}</>;
}

export default FinishedFlashMessage;
