import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Space,
  Select,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { customToastMsg } from "../components/common/commonFunction";
import teaLogo from "./../assets/tea/Capture-removebg-preview.png";

const { Title, Text } = Typography;

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  language: string;
  password: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const success = await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
        contactNumber: values.contactNumber,
        language: values.language,
        password: values.password,
      });
      if (success) {
        customToastMsg("User Register successfully", 1);
        navigate("/login");
      } else {
        message.error("");
        customToastMsg("Registration failed. Please try again.", 0);
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-tea-100 flex items-center justify-center p-4">
      <Card
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          objectFit: "cover",
        }}
        className="w-full max-w-xl shadow-xl  border-0 bg-tea"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br border-2 border-green-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-3xl">
              <img src={teaLogo} alt="" />
            </div>
          </div>
          <Title level={2} className="mb-2 text-gray-800">
            Join TeaCare
          </Title>
          <Text className="text-gray-600">
            Start managing your tea farm today
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className=""
        >
          {/* First & Last Name in one row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="John" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          {/* Email */}
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

          {/* Address */}
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              prefix={<HomeOutlined />}
              placeholder="123 Main St, City, Country"
            />
          </Form.Item>

          {/* Contact Number & Language in one row */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your contact number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="+1234567890" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="language"
                label="Preferred Language"
                rules={[
                  { required: true, message: "Please select your language!" },
                ]}
              >
                <Select placeholder="Select language">
                  <Select.Option value="English">English</Select.Option>
                  <Select.Option value="Spanish">Spanish</Select.Option>
                  <Select.Option value="French">French</Select.Option>
                  <Select.Option value="Chinese">Chinese</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Password */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
            </Col>

            {/* Confirm Password */}
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12"
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>

          {/* Sign In Link */}
          <div className="text-center">
            <Space>
              <Text className="text-gray-500">Already have an account?</Text>
              <Button
                type="link"
                onClick={() => navigate("/login")}
                className="p-0"
              >
                Sign In
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
