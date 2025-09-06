import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Space,
  Button,
  Input,
  Select,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
  SendOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useDropzone } from "react-dropzone";
import teaLeavses from "../assets/tea/tea-leaves.png";
import {
  customToastMsg,
  onlyFirstLetterCapitalFn,
} from "./common/commonFunction";
import smallTea from "../assets/tea/tea.png";

import { GoogleGenAI } from "@google/genai";
import type { PromptOption } from "../util/apiNecessaryInterface";
import teaLogo from "./../assets/tea/Capture-removebg-preview.png";

const { Text } = Typography;
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // ✅ works with Vite
});

type PlantAdvice = {
  diagnosis: string[];
  reasons: string[];
  actions: string[];
  prevention: string[];
};

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();

  const [searchType, setSearchType] = useState<PromptOption[]>([
    {
      label: "General Treatment & Cure",
      value:
        "Provide evidence-based medical solutions, treatments, and potential cures for the following diseases: ",
    },
    {
      label: "Lifestyle & Natural Remedies",
      value:
        "Suggest holistic, lifestyle, and natural remedies, including diet, exercise, and stress management strategies, for the following diseases:",
    },
    {
      label: "Prevention & Early Detection",
      value:
        "List effective prevention strategies and early detection methods, including vaccines, screening tests, and lifestyle modifications, for the following diseases: ",
    },
    {
      label: "Advanced Research & Innovations",
      value:
        "Summarize the latest advancements, experimental therapies, and clinical trials in biotechnology, immunotherapy, or genetics for the following diseases: ",
    },
    {
      label: "Comparative Multi-Disease Prompt",
      value:
        "Compare the causes, symptoms, treatments, and ongoing research progress for the following diseases: ",
    },
  ]);

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const [selectedValue, setSelectedValue] = useState<any>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreviewUrls(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  /* handle submit */
  const handleSubmit = async () => {
    if (files.length === 0) {
      customToastMsg("⚠️ Please select a file.", 2);
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.prediction) {
        setResult(`${data.prediction}`);
      } else {
        customToastMsg(`Unknown error`, 0);
      }
    } catch (err) {
      customToastMsg(" Error connecting to API, Try again!", 0);
    }
  };

  // const handleAsk = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await ai.models.generateContent({
  //       model: "gemini-2.5-flash",
  //       contents: input + "." + selectedValue,
  //       config: {
  //         thinkingConfig: {
  //           thinkingBudget: 0, // optional
  //         },
  //       },
  //     });
  //     //@ts-ignore
  //     setOutput(response?.candidates[0]?.content?.parts[0]?.text);
  //     setLoading(false);

  //     console.log("what is response :", response);
  //   } catch (err) {
  //     setLoading(false);
  //     setOutput("Error calling Gemini API");
  //   }
  // };

  const handleAsk = async () => {
    try {
      setLoading(true);

      const prompt = `
You are a plant disease assistant. The user asks: "${input}".
Extra context: "${selectedValue}".
Return ONLY valid JSON matching this TypeScript type:

{
  "diagnosis": string[],      // max 3
  "reasons": string[],        // max 3
  "actions": string[],        // max 6, imperative verbs
  "prevention": string[]      // max 4
}

Do not include any text outside the JSON.
Keep sentences short.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // optional
          },
        },
        //@ts-ignore
      });

      // @ts-ignore
      const raw = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      const data: PlantAdvice = JSON.parse(raw);
      setOutput(data); // make output state type PlantAdvice | string
    } catch (e) {
      setOutput("Error calling Gemini API");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: any) => {
    setSelectedValue(`${value} ${result}`);
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      {/* Header */}

      <div className="bg-green-50 rounded-xl p-6 mb-6 shadow-sm flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            className="bg-primary-500"
          />
          <div>
            <h2 className="mb-1  text-xl font-semibold text-gray-800">
              Welcome back, Deshan!
            </h2>
            <Text className="text-gray-500">{user?.email}</Text>
          </div>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br border-2 border-green-800 rounded-2xl flex items-center justify-center  mb-4 shadow-lg">
          <div className="text-3xl">
            <img src={teaLogo} alt="" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-6">
        <Col span={24}>
          <Card className="text-center">
            {/* image */}
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #22a066",
                borderRadius: "12px",
                padding: "40px",
                background: isDragActive ? "#f0fdf4" : "#fafafa",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F0F9F4",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop your files here ...</p>
              ) : (
                <>
                  <img
                    src={teaLeavses}
                    style={{ width: "40px" }}
                    className="me-2"
                    alt="tea"
                  />
                  <h2 className="m-0 " style={{ fontSize: "20px" }}>
                    Click to select Tea Leaves
                  </h2>
                </>
              )}
            </div>

            {/* Preview section */}
            {previewUrls.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {previewUrls.map((file, idx) => (
                  <img
                    key={idx}
                    src={file}
                    alt="preview"
                    width={120}
                    height={120}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* drop zone here */}
            <Row gutter={[16, 16]} className="mt-5">
              <Col span={12}>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  className="w-full h-12"
                  size="large"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  icon={<CloseCircleOutlined />}
                  className="w-full h-12"
                  size="large"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card
        title={
          <>
            <FileSearchOutlined style={{ marginRight: 8 }} />
            Your Plant’s Diagnosis
          </>
        }
        className="mb-6"
      >
        <div className="flex flex-col gap-1 px-2 py-1.5 border border-dashed border-input rounded me-2">
          <span className="text-secondary-foreground text-[25px] flex justify-content-center align-items-center">
            <img
              src={smallTea}
              style={{ width: "40px" }}
              className="me-2"
              alt="tea"
            />{" "}
            <small></small>
            <strong style={{ color: "#820014" }}>
              {onlyFirstLetterCapitalFn(result)}
            </strong>
          </span>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card
        title={
          <>
            <div className="flex w-full justify-between items-center">
              <div>
                <SortDescendingOutlined style={{ marginRight: 8 }} />
                Recommended Solution
              </div>
              <div className="mt-2 mb-4">
                <Select
                  className="me-2 border-none"
                  style={{ width: "20rem", marginTop: 8 }}
                  options={searchType.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                  }))}
                  //value={selectedValue}
                  onChange={(v) => handleChange(v)}
                  placeholder="Select a solution type"
                  showSearch
                  allowClear
                  optionFilterProp="label"
                />
              </div>
            </div>
          </>
        }
      >
        <Space direction="vertical" className="w-full">
          <div className="flex items-center w-full bg-slate-50 rounded-full p-2 shadow-lg">
            {/* Input field */}
            <Input
              placeholder="What plant problem do you want help with?"
              className="flex-1 focus:ring-0 focus:outline-none text-gray-700 me-4 text-base"
              bordered={false}
              style={{ height: "40px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* Send button */}
            <Button
              onClick={handleAsk}
              type="primary"
              shape="circle"
              className="bg-[#8E9B6D] hover:bg-[#7b885d] border-none transition-colors duration-200"
              icon={<SendOutlined className="text-white text-lg" />}
              style={{ width: "40px", height: "40px" }}
            />
          </div>

          {isLoading == true ? (
            <div className="w-full flex items-center justify-center mt-3">
              <div className="loader "></div>
            </div>
          ) : (
            <>
              {typeof output !== "string" && output && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <section className="rounded-2xl border p-4 bg-white shadow">
                    <h3 className="font-semibold text-slate-700 mb-2">
                      Diagnosis
                    </h3>
                    <ul className="list-disc ms-5">
                      {output.diagnosis.map((d: any, i: any) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border p-4 bg-white shadow">
                    <h3 className="font-semibold text-slate-700 mb-2">
                      Why it happens
                    </h3>
                    <ul className="list-disc ms-5">
                      {output.reasons.map((r: any, i: any) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border p-4 bg-white shadow md:col-span-2">
                    <h3 className="font-semibold text-slate-700 mb-2">
                      What to do now
                    </h3>
                    <ol className="list-decimal ms-5 space-y-1">
                      {output.actions.map((a: any, i: any) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-2xl border p-4 bg-white shadow md:col-span-2">
                    <h3 className="font-semibold text-slate-700 mb-2">
                      Prevention
                    </h3>
                    <ul className="list-disc ms-5">
                      {output.prevention.map((p: any, i: any) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Dashboard;
