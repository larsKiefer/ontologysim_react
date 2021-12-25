const initialState = {
  finishFlashMessage: true,
  isLoading: false,
};

/**
 * view toggle data, should later save all layout relevant data
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FINISHED_FLASH_MESSAGE": {
      return { ...state, finishFlashMessage: !state.finishFlashMessage };
    }
    case "SET_FINISHED_FLASH_MESSAGE": {
      return {
        ...state,
        finishFlashMessage: action.payload.finishFlashMessage,
      };
    }
    default: {
      return state;
    }
  }
};

export default layoutReducer;
