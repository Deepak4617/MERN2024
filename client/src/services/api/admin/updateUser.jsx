import axios from "axios";
import Cookies from 'js-cookie';
import { createAsyncThunk } from "@reduxjs/toolkit";

const updateUser = createAsyncThunk('updateUser', async ({ id, payload }, { rejectWithValue }) => {
    try {
        const token = Cookies.get('authToken')

        const response = await axios.patch(`http://localhost:5000/api/admin/users/update/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data || "Network Error"
        );
    }
}
);

export default updateUser;
