import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Space,
  Alert,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { customToastMsg } from "./common/commonFunction";
import teaLogo from "./../assets/tea/Capture-removebg-preview.png";

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    customToastMsg("User Register successfully", 1);
    setLoading(true);
    try {
      const success = await login({
        email: values.email,
        password: values.password,
      });
      if (success) {
        console.log("success :", success);
        navigate("/dashboard");
      } else {
        message.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-tea-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 min-h-80">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br border-2 border-green-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-3xl">
              <img src={teaLogo} alt="" />
            </div>
          </div>
          <Title level={2} className="text-gray-800">
            Welcome to TeaCare
          </Title>

          <Text className="text-gray-600">Sign in to manage your tea farm</Text>
        </div>

        {/* <Alert
          message="Demo Login"
          description="Email: user@example.com | Password: password"
          type="success"
          showIcon
          className="mb-6 border-tea-200 bg-tea-50"
        /> */}

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-primary-600 hover:bg-primary-700"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space>
              <Text className="text-gray-500">Don't have an account?</Text>
              <Button
                type="link"
                onClick={() => navigate("/register")}
                className="p-0 text-primary-600 font-semibold"
              >
                Sign Up
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
