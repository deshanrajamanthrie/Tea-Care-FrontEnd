import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Space,
  Typography,
  Divider,
  List,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
  BellOutlined,
  SecurityScanOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "./common/translate";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<any>();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    let detail = localStorage.getItem("user");
    if (detail) {
      setUserDetail(JSON.parse(detail));
      console.log("User detail:", JSON.parse(detail));
    }
  }, []);

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-tea-50 to-green-50 min-h-screen">
      {/* Profile Header */}
      <Card className="text-start mb-6 border-0 shadow-md rounded-2xl">
        <div className="flex items-center p-2">
          {/* Avatar Component */}
          <Avatar size={70} icon={<UserOutlined />} />

          {/* Container for user information */}
          <div className="ml-4">
            <h3 className="font-semibold text-lg m-0">
              {userDetail?.firstName} {userDetail?.lastName}
            </h3>
            <p className="text-gray-500 m-0">Tea Farmer</p>
            <p className="text-sm text-gray-400 m-0">{userDetail?.email}</p>
          </div>
        </div>
      </Card>

      {/* Profile Options */}
      <Card
        title="User Detail"
        extra={<GoogleTranslate />}
        className="mb-6 border-0 shadow-md rounded-2xl"
      >
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} md={8}>
            <h1 className="font-semibold">First Name :</h1>
            <p className="text-gray-600"> {userDetail?.firstName} </p>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <p className="font-semibold">Last Name :</p>
            <p className="text-gray-600">{userDetail?.lastName}</p>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <p className="font-semibold">Email Address :</p>
            <p className="text-gray-600">{userDetail?.address}</p>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p className="font-semibold">Contact Number :</p>
            <p className="text-gray-600">{userDetail?.contactNumber}</p>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <p className="font-semibold">Current Language</p>
            <p className="text-gray-600">{userDetail?.language}</p>
          </Col>
        </Row>
      </Card>

      {/* Account Actions */}
      <Card title="Account Actions" className="border-0 shadow-md rounded-2xl">
        <Space direction="vertical" className="w-full">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="w-full h-12 border-0 rounded-xl"
            style={{ backgroundColor: "#00623A" }}
            size="large"
          >
            Edit Profile
          </Button>
          <Divider />
          <Button
            danger
            icon={<LogoutOutlined />}
            className="w-full h-12 rounded-xl"
            size="large"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
