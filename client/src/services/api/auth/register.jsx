import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_register } from "../../../networking/urlEndPoint";

import Axios from "../../../networking/interceptor";

const authRegister = createAsyncThunk('authRegister', async (userDetail, { rejectWithValue }) => {
    try {
        const requestData = {
            username: userDetail?.username,
            email: userDetail?.email,
            phone: userDetail?.phone,
            password: userDetail?.password
        };
        const response = await Axios.post(auth_register, requestData);
        const data = response.data;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export default authRegister;
