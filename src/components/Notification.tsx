import React from "react";
import { Card, List, Avatar, Typography, Badge, Button, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Notifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: "Harvest Ready!",
      description: "Section A tea plants are ready for harvesting.",
      time: "2 minutes ago",
      icon: <div className="text-lg">🌿</div>,
      unread: true,
    },
    {
      id: 2,
      title: "Weather Alert",
      description: "Heavy rain expected tomorrow. Protect your tea plants.",
      time: "30 minutes ago",
      icon: <div className="text-lg">🌧️</div>,
      unread: true,
    },
    {
      id: 3,
      title: "Quality Report",
      description: "Your tea quality assessment report is ready.",
      time: "1 hour ago",
      icon: <div className="text-lg">📋</div>,
      unread: false,
    },
    {
      id: 4,
      title: "Market Price Update",
      description: "Tea prices have increased by 5% this week.",
      time: "2 hours ago",
      icon: <div className="text-lg">💰</div>,
      unread: false,
    },
    {
      id: 5,
      title: "Welcome to TeaFarm!",
      description: "Start managing your tea farm with our comprehensive tools.",
      time: "1 day ago",
      icon: <div className="text-lg">🌱</div>,
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-tea-50 to-green-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#00623A" }}
            >
              <Badge count={unreadCount} size="small">
                <div className="text-xl text-white">📊</div>
              </Badge>
            </div>
            <Title level={2} className="mb-0 text-gray-800">
              Farm Reports
            </Title>
          </div>
          {unreadCount > 0 && (
            <Button
              type="text"
              icon={<CheckOutlined />}
              size="small"
              style={{ color: "#00623A" }}
            >
              Mark All Read
            </Button>
          )}
        </div>
        <Text className="text-gray-600">
          Stay updated with your farm activities and alerts
        </Text>
      </div>

      {/* Notifications List */}
      <Card className="border-0 shadow-md rounded-2xl">
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer rounded-lg transition-colors ${
                item.unread ? "" : ""
              }`}
              style={{
                backgroundColor: item.unread ? "#f0f9f4" : "transparent",
              }}
            >
              <List.Item.Meta
                avatar={
                  <div className="relative">
                    <Avatar
                      icon={item.icon}
                      className="border-2"
                      style={{
                        backgroundColor: "#dcf4e6",
                        borderColor: "#bae8d0",
                      }}
                    />
                    {item.unread && (
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: "#00623A" }}
                      ></div>
                    )}
                  </div>
                }
                title={
                  <div className="flex items-center justify-between">
                    <Text
                      strong
                      className={item.unread ? "" : "text-gray-800"}
                      style={{ color: item.unread ? "#0f422a" : undefined }}
                    >
                      {item.title}
                    </Text>
                    <Text type="secondary" className="text-xs">
                      {item.time}
                    </Text>
                  </div>
                }
                description={
                  <Text type="secondary" className="text-sm">
                    {item.description}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Empty State Alternative */}
      {notifications.length === 0 && (
        <Card className="text-center py-12 border-0 shadow-md rounded-2xl">
          <div className="text-4xl mb-4">📊</div>
          <Title level={4} className="text-gray-400 mb-2">
            No reports yet
          </Title>
          <Text type="secondary">
            When you have notifications, they'll appear here
          </Text>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
