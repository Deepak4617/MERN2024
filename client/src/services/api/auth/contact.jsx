import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_contact } from "../../../networking/urlEndPoint";
import Axios from "../../../networking/interceptor";

const authContact = createAsyncThunk('authContact', async (userDetail, { rejectWithValue }) => {
    try {
        const requestData = {
            userName: userDetail?.userName,
            email: userDetail?.email,
            message: userDetail?.message
        };
        const response = await Axios.post(auth_contact, requestData);
        const data = response.data;
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export default authContact;
