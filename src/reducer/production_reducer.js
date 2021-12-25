const initialState = {
  index: undefined,
  productionList: [],
};

/**
 * saves all production data (the last 10 production states are saved)
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const productionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_SIMULATION":
      return { ...state, ...action.payload.production };

    case "ADD_EVENT_SUCCESS":
      if (action.payload.productionDict) {
        if (state.productionList.length >= 10) {
          var lenproductionList = state.productionList.length;
          return {
            index: lenproductionList - 1,
            productionList: [
              ...state.productionList.slice(1, lenproductionList),
              action.payload.productionDict,
            ],
          };
        } else {
          var lenproductionList = state.productionList.length;
          return {
            ...state,
            index: lenproductionList,
            productionList: [
              ...state.productionList,
              action.payload.productionDict,
            ],
          };
        }
      } else {
        return state;
      }

    case "GO_TO_LAST_PRODUCTION_INDEX":
      return { ...state, index: 0 };
    case "GO_TO_FIRST_PRODUCTION_INDEX":
      return { ...state, index: state.productionList.length };
    case "NEXT_PRODUCTION_INDEX":
      if (
        state.index == undefined ||
        state.index > state.productionList.length - 1
      ) {
        return { ...state };
      } else if (state.index + 1 == state.productionList.length) {
        return { ...state };
      } else {
        return { ...state, index: state.index + 1 };
      }
    case "BACKWARD_PRODUCTION_INDEX":
      if (state.index == undefined || state.index <= 0) {
        return { ...state };
      } else {
        return { ...state, index: state.index - 1 };
      }

    case "REMOVE_EVENTS":
      
      if (state.index == undefined) {
        return { ...state };
      } else {
        return { ...state, index: undefined, productionList: [] };
      }

    default: {
      return state;
    }
  }
};

export default productionReducer;
