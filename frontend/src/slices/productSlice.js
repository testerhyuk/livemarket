import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'todayProductsSlice',
    initialState: [],
    reducers: {
        todayProducts : (state, action) => {
            return action.payload
        }
    }
})

export const {todayProducts} = productSlice.actions

export default productSlice.reducer