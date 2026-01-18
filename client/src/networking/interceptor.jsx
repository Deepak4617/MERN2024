import axios from "axios";
import Cookies from 'js-cookie';

const Axios = axios.create({
	baseURL:  https://mernbackend-3zeu.onrender.com/,
	withCredentials: true
});

Axios.interceptors.request.use((config) => {
	const token = Cookies.get("authToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default Axios;
