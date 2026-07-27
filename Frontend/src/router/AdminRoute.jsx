import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (user?.role !== "admin") {
            return <Navigate to="/dashboard" replace />;
        }

        return children;
    } catch {
        return <Navigate to="/dashboard" replace />;
    }
};

export default AdminRoute;
