const initialState = {
  defaultFiles: [],
  files: [],
  isDefaultSelected: false,
  isDragDropSelected: false,
  isLoading: false,
};

/**
 * load and saves all simulation files
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const loadSimulationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DEFAULT_FILES":
      var isDefaultSelected = true;
      if (state.isDragDropSelected) {
        isDefaultSelected = false;
      }

      return {
        ...state,
        defaultFiles: [...action.payload.files],
        isDefaultSelected: isDefaultSelected,
      };
    case "LOAD_FILES":
      return {
        ...state,
        files: [...action.payload.files],
        isDefaultSelected: false,
        isDragDropSelected: true,
      };
    case "CHANGE_SELECTION": {
      if (action.payload == undefined) {
        return {
          ...state,
          isDefaultSelected: !state.isDefaultSelected,
          isDragDropSelected: !state.isDragDropSelected,
        };
      } else {
        return {
          ...state,
          isDragDropSelected: action.payload.isDragDropSelected,
          isDefaultSelected: action.payload.isDefaultSelected,
        };
      }
    }
    case "RESET_SELECTION": {
      return { ...state, isDragDropSelected: false, isDefaultSelected: false };
    }
    case "IS_LOADING":
      return { ...state, isLoading: !state.isLoading };

    default: {
      return state;
    }
  }
};

export default loadSimulationReducer;
