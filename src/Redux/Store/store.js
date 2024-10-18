
import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "../Reducer/habitReducer";

export const store = configureStore({
    reducer:{
        habitReducer,   
    },
})