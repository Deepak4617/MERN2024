import { createSlice } from "@reduxjs/toolkit";
import getUserData from "../../api/auth/getUserData";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getUserDataSlice = createSlice({
    name: 'getUserData',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getUserData.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getUserData.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getUserDataSlice.reducer