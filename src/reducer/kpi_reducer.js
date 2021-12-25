const initialState = {
  machine: {},
  transporter: {},
  queue: {},
  product: {},
  sim: {},
  isLoading: false,
};

/**
 * saves all kpi data
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const kpiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_KPIS": {
      return { ...state, isLoading: true };
    }
    case "ADD_KPIS_SUCCESS": {
      return { ...state, ...action.payload, isLoading: false };
    }

    default: {
      return state;
    }
  }
};

export default kpiReducer;
