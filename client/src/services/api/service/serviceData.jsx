import { createAsyncThunk } from "@reduxjs/toolkit";
import { data_service } from "../../../networking/urlEndPoint";
import Axios from "../../../networking/interceptor";

const getServicesData = createAsyncThunk('getServicesData', async (_, { rejectWithValue }) => {
    try {

        const response = await Axios.get(data_service);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getServicesData;