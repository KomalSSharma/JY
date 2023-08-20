import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import {userApi} from './api/userApi'
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer : {
       [userApi.reducerPath] : userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
})

setupListeners(store.dispatch)

