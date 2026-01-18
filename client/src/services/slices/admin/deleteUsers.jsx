import { createSlice } from "@reduxjs/toolkit";
import deleteUsers from "../../api/admin/deleteUsers";
const initialState = {
    loading: false,
    data: null,
    error: null
}

const deleteUsersSlice = createSlice({
    name: 'deleteUsers',
    initialState,

    reducers: {
        resetDeleteUsers: () => initialState
    },

    extraReducers: (builder) => {
        builder.addCase(deleteUsers.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(deleteUsers.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})
export const {resetDeleteUsers} = deleteUsersSlice?.actions
export default deleteUsersSlice?.reducer