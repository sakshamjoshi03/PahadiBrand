import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import OAuthSuccess from "../pages/OAuthSuccess/OAuthSuccess";
import YourPahadiBhula from "../pages/YourPahadiBhula/YourPahadiBhula";
import ProductManagement from "../pages/Admin/ProductManagement";

function AppRouter({ darkMode }) {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home darkMode={darkMode} />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetails darkMode={darkMode} />}
      />

      <Route
        path="/about"
        element={<About darkMode={darkMode} />}
      />

      <Route
        path="/bhula"
        element={<YourPahadiBhula />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard darkMode={darkMode} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Navigate to="/admin/products" replace />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Navigate to="/admin/products" replace />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/login"
        element={<Login darkMode={darkMode} />}
      />

      <Route
        path="/signup"
        element={<Signup darkMode={darkMode} />}
      />

      <Route
        path="/oauth-success"
        element={<OAuthSuccess />}
      />

    </Routes>
  );
}

export default AppRouter;