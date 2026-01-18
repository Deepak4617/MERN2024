import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_user } from "../../../networking/urlEndPoint";

import Cookies from 'js-cookie';
import Axios from "../../../networking/interceptor";

const getUserData = createAsyncThunk('userData', async (_, { rejectWithValue }) => {
    try {
        const token = Cookies.get('authToken')
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
      
        const response = await Axios.get(auth_user, config);
        const data = response.data;
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getUserData;