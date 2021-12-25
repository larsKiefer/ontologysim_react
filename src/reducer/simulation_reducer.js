const initialState = {
  alreadyStarted: false,
  run: false,
  isLoading: false,
  simulationFinished: false,
};

/**
 * saves current simulation state (running state)
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const simulationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_SIMULATION":
      return {
        ...state,
        alreadyStarted: action.payload.alreadyStarted,
        run: action.payload.run,
      };

    case "CHANGE_RUNNING":
      return { ...state, alreadyStarted: true, run: !state.run };

    case "RESET_RUNNING":
      return initialState;

    case "LOAD_FILES":
      return {
        ...state,
        alreadyStarted: false,
        run: false,
      };

    case "ADD_EVENT_SUCCESS":
      return {
        ...state,
        simulationFinished: action.payload.simulationFinished,
      };

    case "ACTIVATE_ALREADY_RUNNING":
      return { ...state, alreadyStarted: true, simulationFinished: false };

    case "CHANGE_SELECTION":
      return {
        ...state,
        alreadyStarted: false,
        run: false,
      };

    default: {
      return state;
    }
  }
};

export default simulationReducer;
