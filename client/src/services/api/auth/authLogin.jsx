import Cookies from 'js-cookie';
import Axios from "../../../networking/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_login } from "../../../networking/urlEndPoint";

const authLogin = createAsyncThunk('authLogin', async (userDetail, { rejectWithValue }) => {
    try {
        const requestData = {
            email: userDetail?.email,
            password: userDetail?.password,
        };
        const response = await Axios.post(auth_login, requestData);
        if (!response?.data?.token) {
            return rejectWithValue("Invalid email or password");
        }
        const data = response.data;

        Cookies.set("authToken", data?.token);

        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export default authLogin;
