import { createSlice } from "@reduxjs/toolkit";
import authContact from '../../api/auth/contact'

const initialState = {
    loading: false,
    data: null,
    error: null
}

const authContactSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        resetAuthState: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(authContact.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(authContact.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(authContact.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export const { resetAuthState } = authContactSlice.actions;
export default authContactSlice.reducer