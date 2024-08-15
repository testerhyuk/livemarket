import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import productSlice from "./slices/productSlice";

export default configureStore({
    reducer : {
        "loginSlice" : loginSlice,
        'productSlice' : productSlice
    }
})