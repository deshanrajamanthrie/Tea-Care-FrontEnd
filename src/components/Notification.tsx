import React, { useState } from "react";
import {
  Form,
  Select,
  DatePicker,
  Slider,
  Input,
  Button,
  message,
  Card,
} from "antd";
import type { FormProps } from "antd";

const { Option } = Select;

type FormValues = {
  leafGrade: string;
  month: string;
  rainfall: number;
  temperature: number;
  previousPrice: number;
};

export default function AuctionPriceForm() {
  const [auctionPrice, setAuctionPrice] = useState<string | null>(null);

  const onFinish: FormProps<FormValues>["onFinish"] = (values) => {
    // Mock prediction logic (replace with API call)
    const predictedPrice = (Math.random() * 1000).toFixed(2);
    setAuctionPrice(predictedPrice);
    message.success("Prediction generated!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          Tea Auction Price Prediction
        </h2>
        <Form<FormValues> layout="vertical" onFinish={onFinish}>
          {/* Leaf Grade */}
          <Form.Item
            name="leafGrade"
            label="Leaf Grade"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Leaf Grade">
              <Option value="BOPF">BOPF</Option>
              <Option value="Dust">Dust</Option>
              <Option value="Leaf">Leaf</Option>
              <Option value="Best">Best</Option>
            </Select>
          </Form.Item>

          {/* Month */}
          <Form.Item name="month" label="Month" rules={[{ required: true }]}>
            <DatePicker picker="month" className="w-full" />
          </Form.Item>

          {/* Rainfall */}
          <Form.Item
            name="rainfall"
            label="Rainfall (mm)"
            rules={[{ required: true }]}
          >
            <Slider min={0} max={500} marks={{ 0: "0", 500: "500" }} />
          </Form.Item>

          {/* Temperature */}
          <Form.Item
            name="temperature"
            label="Temperature (°C)"
            rules={[{ required: true }]}
          >
            <Slider min={0} max={50} marks={{ 0: "0", 50: "50" }} />
          </Form.Item>

          {/* Previous Week Price */}
          <Form.Item
            name="previousPrice"
            label="Previous Week Price"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter last week price" />
          </Form.Item>

          {/* Prediction Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-xl"
            >
              Predict Auction Price
            </Button>
          </Form.Item>
        </Form>

        {/* Auction Price Result */}
        {auctionPrice && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl text-center">
            <p className="text-lg font-semibold text-green-700">
              Predicted Auction Price: Rs. {auctionPrice}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
