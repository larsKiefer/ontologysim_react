
import {combineReducers} from 'redux'
import eventlistReducer from './eventlist_reducer'
import simulationReducer from './simulation_reducer'
import sidebarReducer from "./sidebar_reducer"
import loadSimulationReducer from "./load_simulation_reducer"
import kpiReducer from "./kpi_reducer"
import filterReducer from "./filter_reducer"
import productionReducer from "./production_reducer"
import layoutReducer from './layout_reducer'

// root reducer, combines all reducer
const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    event: eventlistReducer,
    simulation: simulationReducer,
    layout: layoutReducer,
    loadSimulation: loadSimulationReducer,
    kpi: kpiReducer,
    filter: filterReducer,
    production: productionReducer
})

export default rootReducer