import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  CompassOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      key: "/dashboard",
      icon: () => <div className="text-xl">🏠</div>,
      label: "Farm",
    },
    {
      key: "/explore",
      icon: () => <div className="text-xl">🌱</div>,
      label: "Learn",
    },
    {
      key: "/notifications",
      icon: () => <div className="text-xl">📊</div>,
      label: "Reports",
    },
    {
      key: "/profile",
      icon: () => <div className="text-xl">👤</div>,
      label: "Profile",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-tea-100 px-4 py-2 safe-area-pb z-50 shadow-lg">
      <div className="flex justify-around">
        {navItems.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => navigate(key)}
            className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200"
            style={{
              color: isActive(key) ? "#00623A" : "#6b7280",
              backgroundColor: isActive(key) ? "#f0f9f4" : "transparent",
            }}
          >
            <Icon />
            <span
              className="text-xs font-medium"
              style={{ color: isActive(key) ? "#00623A" : "#6b7280" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
