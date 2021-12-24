import {combineReducers} from "redux";
import thunk from "redux-thunk";

import {configureStore} from '@reduxjs/toolkit'
import {DataReduser} from "../State/dataTool.reducer";


const RootReducer = combineReducers({
    Data: DataReduser
})

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                thunk
            ),
    reducer: RootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch