import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
// import Axios from "../../../networking/interceptor";

const deleteUsers = createAsyncThunk('deleteUsers', async (id, { rejectWithValue }) => {
    try {
        const token = Cookies.get('authToken')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.delete(`http://localhost:5000/api/admin/users/delete/${id}`,config);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default deleteUsers;