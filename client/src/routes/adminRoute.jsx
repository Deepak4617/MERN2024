import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authToken } from "../storage/authToken";

const AdminRoute = () => {
    const token = authToken();

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (err) {
        return <Navigate to="/login" replace />;
    }

    // Admin check
    if (!decoded?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
