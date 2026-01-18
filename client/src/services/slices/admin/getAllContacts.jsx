import { createSlice } from "@reduxjs/toolkit";
import getAllContacts from "../../api/admin/getAllContacts";
const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllContactsSlice = createSlice({
    name: 'getAllContacts',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllContacts.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllContacts.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllContacts.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllContactsSlice.reducer