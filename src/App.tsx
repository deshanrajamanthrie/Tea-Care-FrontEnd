import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import Notifications from "./components/Notification";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00623A",
          colorSuccess: "#22a066",
          colorInfo: "#00623A",
          borderRadius: 12,
          fontFamily: "Inter, system-ui, sans-serif",
        },
        components: {
          Button: {
            borderRadius: 12,
            controlHeight: 48,
          },
          Card: {
            borderRadius: 16,
          },
          Input: {
            borderRadius: 12,
            controlHeight: 48,
          },
        },
      }}
    >
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
