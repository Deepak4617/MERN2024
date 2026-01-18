import axios from "axios";
import Cookies from 'js-cookie';
import { createAsyncThunk } from "@reduxjs/toolkit";
// import Axios from "../../../networking/interceptor";

const getAllUsers = createAsyncThunk('allUsers', async (_, { rejectWithValue }) => {
    try {
        const token = Cookies.get('authToken')
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
      
        const response = await axios.get('http://localhost:5000/api/admin/users', config);
        const data = response.data;
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getAllUsers;