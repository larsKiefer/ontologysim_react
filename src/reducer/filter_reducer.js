const initialState = {
  isLoading: false,
  all: [],
  queue: [],
  product: [],
  machine: [],
  transporter: [],
  orderRelease: [],
};

/**
 * filter reducer to filter event data
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      return { ...state, [action.payload.table]: [...action.payload.data] };
    }
    case "REMOVE_FILTER": {
      var filtered = state[action.payload.table].filter(
        (elementList) => elementList["column"] != action.payload.columnID
      );

      return { ...state, [action.payload.table]: [...filtered] };
    }
    case "RESET_ALL_FILTERS": {
      return { ...state, [action.payload.table]: [] };
    }
    default: {
      return state;
    }
  }
};

export default filterReducer;
