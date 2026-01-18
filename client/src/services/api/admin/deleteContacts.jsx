import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import Axios from "../../../networking/interceptor";
// import Axios from "../../../networking/interceptor";

const deleteContact = createAsyncThunk('deleteContact', async (id, { rejectWithValue }) => {
    try {
        const token = Cookies.get('authToken')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await Axios.delete(`http://localhost:5000/api/admin/contacts/delete/${id}`, config);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default deleteContact;