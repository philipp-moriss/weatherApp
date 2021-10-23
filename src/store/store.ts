import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {DataReducer} from "../State/data.reducer";


const RootReducer = combineReducers({
    Data : DataReducer
})

export type RootReducerType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer,applyMiddleware(thunk))