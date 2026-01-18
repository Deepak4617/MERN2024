import { createSlice } from "@reduxjs/toolkit";
import updateUser from "../../api/admin/updateUser";
const initialState = {
    loading: false,
    data: null,
    error: null
}

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState,
    reducers: {
        resetUpdateUser: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(updateUser.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(updateUser.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})
export const { resetUpdateUser } = updateUserSlice?.actions
export default updateUserSlice?.reducer