const initialState = {
  active: false,
  activeElement: "upload",
};

/**
 * handles sidebar
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, active: !state.active };
    case "CHANGE_SIDEBAR":
      return {
        ...state,
        activeElement: action.payload.sidebarElement,
      };

    default: {
      return state;
    }
  }
};

export default sidebarReducer;
