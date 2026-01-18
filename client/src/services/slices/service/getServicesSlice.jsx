import { createSlice } from "@reduxjs/toolkit";
import getServicesData from "../../api/service/serviceData";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getServicesDataSlice = createSlice({
    name: 'getServicesData',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getServicesData.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getServicesData.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getServicesData.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getServicesDataSlice.reducer