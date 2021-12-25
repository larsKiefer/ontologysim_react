const initialState = { event_list: [], time: "", nrEvent: 0, isLoading: false };

/**
 * saves all events
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const eventlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, isLoading: true };

    case "ADD_EVENT_SUCCESS":
      var event_list = action.payload.eventOntoList;
      var time = "";
      var nrEvent = 0;
      event_list = event_list.map((event) => {
        return {
          ...event,
          time: Math.round(event.time * 100) / 100,
          time_diff: Math.round(event.time_diff * 100) / 100,
        };
      });
      if (event_list.length > 0) {
        time = event_list[event_list.length - 1].time;
        if (state.time <= time) {
          nrEvent = state.nrEvent + event_list.length;
        } else {
          nrEvent = 0;
        }
      } else {
        nrEvent = state.nrEvent;
        time = state.time;
      }

      return {
        ...state,
        isLoading: false,
        event_list: [...state.event_list, ...event_list],
        nrEvent: nrEvent,
        time: time,
      };

    case "REMOVE_EVENT":
      return {
        ...state,
        event_list: state.event_list.filter(
          (item) => item.name !== action.payload.event.name
        ),
      };

    case "REMOVE_EVENTS":
      return { ...state, event_list: [] };

    default: {
      return state;
    }
  }
};

export default eventlistReducer;
