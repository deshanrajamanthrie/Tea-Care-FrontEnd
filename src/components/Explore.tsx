import React from "react";
import { Card, Row, Col, Typography, Tag, Avatar, Space, Button } from "antd";
import {
  CompassOutlined,
  StarOutlined,
  EyeOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Explore: React.FC = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Tea Plant Care Guide",
      description:
        "Learn the best practices for maintaining healthy tea plants.",
      image:
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Farming",
      views: "3.2k",
      likes: "245",
    },
    {
      id: 2,
      title: "Organic Tea Farming",
      description: "Discover sustainable and organic tea farming methods.",
      image:
        "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Organic",
      views: "2.8k",
      likes: "189",
    },
    {
      id: 3,
      title: "Tea Processing Techniques",
      description:
        "Master the art of processing tea leaves for premium quality.",
      image:
        "https://images.pexels.com/photos/1793036/pexels-photo-1793036.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Processing",
      views: "4.1k",
      likes: "312",
    },
  ];

  const categories = [
    "All",
    "Farming",
    "Organic",
    "Processing",
    "Harvesting",
    "Market",
  ];

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-tea-50 to-green-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#00623A" }}
          >
            <div className="text-xl">🔍</div>
          </div>
          <Title level={2} className="mb-0 text-gray-800">
            Explore Tea Farming
          </Title>
        </div>
        <Text className="text-gray-600">
          Discover farming techniques and best practices
        </Text>
      </div>

      {/* Categories */}
      <Card className="mb-6 border-0 shadow-md rounded-2xl">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Tag
              key={category}
              color={index === 0 ? "green" : "default"}
              className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1"
            >
              {category}
            </Tag>
          ))}
        </div>
      </Card>

      {/* Featured Content */}
      <Title level={4} className="mb-4 text-gray-800">
        Featured Guides
      </Title>
      <Row gutter={[16, 16]} className="mb-6">
        {featuredItems.map((item) => (
          <Col span={24} key={item.id}>
            <Card
              hoverable
              className="border-0 shadow-md rounded-2xl overflow-hidden"
              cover={
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Tag color="green" className="rounded-lg">
                      {item.category}
                    </Tag>
                  </div>
                </div>
              }
            >
              <Title level={5} className="mb-2 text-gray-800">
                {item.title}
              </Title>
              <Text className="text-gray-600 text-sm block mb-3">
                {item.description}
              </Text>

              <div className="flex items-center justify-between">
                <Space>
                  <Space size="small">
                    <EyeOutlined style={{ color: "#00623A" }} />
                    <Text className="text-sm text-gray-600">{item.views}</Text>
                  </Space>
                  <Space size="small">
                    <HeartOutlined className="text-red-500" />
                    <Text className="text-sm text-gray-600">{item.likes}</Text>
                  </Space>
                </Space>
                <Button
                  type="text"
                  icon={<ShareAltOutlined />}
                  style={{ color: "#00623A" }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Trending Topics */}
      <Title level={4} className="mb-4 text-gray-800">
        Trending Topics
      </Title>
      <Card className="border-0 shadow-md rounded-2xl">
        <Space direction="vertical" className="w-full">
          {[
            "Sustainable Farming",
            "Tea Quality Control",
            "Pest Management",
            "Market Prices",
          ].map((topic, index) => (
            <div key={topic} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#dcf4e6" }}
                >
                  <Text
                    className="font-medium text-sm"
                    style={{ color: "#00623A" }}
                  >
                    {index + 1}
                  </Text>
                </div>
                <div>
                  <Text strong className="text-gray-800">
                    {topic}
                  </Text>
                  <br />
                  <Text type="secondary" className="text-sm">
                    {Math.floor(Math.random() * 50) + 10}k farmers discussing
                  </Text>
                </div>
              </div>
              <StarOutlined style={{ color: "#00623A" }} />
            </div>
          ))}
        </Space>
      </Card>
    </div>
  );
};

export default Explore;
