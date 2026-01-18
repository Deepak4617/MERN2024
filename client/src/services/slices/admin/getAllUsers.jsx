import { createSlice } from "@reduxjs/toolkit";
import getAllUsers from "../../api/admin/getAllUsers";
const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllUsersSlice = createSlice({
    name: 'getAllUsers',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllUsers.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllUsersSlice.reducer