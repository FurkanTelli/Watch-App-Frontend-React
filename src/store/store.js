import { configureStore } from "@reduxjs/toolkit";
import userWhoLoginned from "./userSlice";

export const store = configureStore({
    reducer:{
        userStatus: userWhoLoginned
    }
})