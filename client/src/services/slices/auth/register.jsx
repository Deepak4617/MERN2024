import { createSlice } from "@reduxjs/toolkit";
import authRegister from "../../api/auth/register";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const authRegisterSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        resetAuthState: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(authRegister.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(authRegister.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(authRegister.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export const { resetAuthState } = authRegisterSlice.actions;
export default authRegisterSlice.reducer