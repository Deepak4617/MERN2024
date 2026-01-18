import { createSlice } from "@reduxjs/toolkit";
import deleteContact from "../../api/admin/deleteContacts";
const initialState = {
    loading: false,
    data: null,
    error: null
}

const deleteContactSlice = createSlice({
    name: 'deleteUsers',
    initialState,

    reducers: {
        resetDeleteContacts: () => initialState
    },

    extraReducers: (builder) => {
        builder.addCase(deleteContact.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(deleteContact.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(deleteContact.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})
export const { resetDeleteContacts } = deleteContactSlice?.actions
export default deleteContactSlice?.reducer