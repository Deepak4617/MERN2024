import { createAsyncThunk } from "@reduxjs/toolkit";
import { admin_contacts } from "../../../networking/urlEndPoint";
import Axios from "../../../networking/interceptor";

const getAllContacts = createAsyncThunk('allContacts', async (_, { rejectWithValue }) => {
    try {

        const response = await Axios.get(admin_contacts);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getAllContacts;