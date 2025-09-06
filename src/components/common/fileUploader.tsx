//@ts-ignore
import { Col, Popconfirm, Row, type UploadFile } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloseCircleFilled, CloseOutlined } from "@ant-design/icons";

import { customToastMsg } from "./commonFunction";

interface MultipleFileUploaderProps {
  onFileListChange: (fileList: UploadFile[]) => void;
  getEachFileRes?: (fileResponse: any) => void;
}

const MultipleFileUploader: React.FC<MultipleFileUploaderProps> = ({
  onFileListChange,
  getEachFileRes,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const lightGallery = useRef<any>(null);

  const text = "Do you want to delete this?";

  useEffect(() => {
    if (lightGallery.current) {
      lightGallery.current.refresh();
    }
  }, [fileList]);

  useEffect(() => {
    onFileListChange(fileList);
    console.log("file list :", fileList);
  }, [fileList, onFileListChange]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      //const isValidFormat = /\.(jpg|jpeg|png|svg)$/i.test(acceptedFiles.name);

      setIsUploading(true);

      acceptedFiles.forEach(async (file) => {
        const isLessThan10Mb = 10 * 1024 * 1024;
        if (isLessThan10Mb < file.size) {
          customToastMsg("File size exceeds, the maximum limit of 10 MB", 0);
          return;
        } else {
          try {
            // const isValidFormat = /\.(jpg|jpeg|png|svg|mp4|MP4)$/i.test( file.name);
            let uploadFile = file;

            // console.log(" yoo Upload file :", uploadFile);

            const formData = new FormData();
            formData.append("file", uploadFile);
            formData.append("resizeOption", "false");

            // const response = await uploadFiles(formData);
            // const newFile = {
            //   uid: response?.data?.id,
            //   name: response?.data?.fileName,
            //   status: "done",
            //   url: response?.data?.path,
            //   type: response?.data?.fileType,
            // } as UploadFile;

            // setFileList((prev) => [...prev, newFile]);
            // if (getEachFileRes) {
            //   getEachFileRes(newFile);
            // }
          } catch (error: any) {
            customToastMsg(error.message || "Upload failed", 0);
          }
        }
      });
      setIsUploading(false);
    },
    [getEachFileRes]
  );

  const onDropRejected = (rejectedFiles: any) => {
    customToastMsg(
      "Invalid file type, only (image/** and video/**) are allowed",
      0
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleRemoveFile = (uid: string) => {
    setFileList((prev) => prev.filter((file) => file.uid !== uid));
  };

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #00BD9D",
          padding: "20px",
          height: "10rem",
          textAlign: "center",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(221 255 226 / 61%);",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="m-0">Drop the files here...</p>
        ) : (
          <>
            <img src="" alt="" />
            <h2 className="m-0 " style={{ fontSize: "20px" }}>
              Click to select Tea Leaves
            </h2>
          </>
        )}
      </div>
      {isUploading && <p>Uploading files...</p>}

      <Row style={{ marginTop: "5px" }}>
        {fileList.map((file) => (
          <Col
            xs={24}
            sm={file.type === "IMAGE" ? 8 : 24}
            md={file.type === "IMAGE" ? 8 : 24}
            key={file.uid}
            style={{ marginBottom: "5px" }}
            className="d-flex w-100"
          >
            {file.type === "IMAGE" && (
              <img
                src={file.url}
                alt={file.name}
                style={{
                  maxWidth: "100%",
                  objectFit: "cover",
                  maxHeight: "200px",
                  borderRadius: "0px",
                  padding: "0px 8px 0px 0px",
                }}
              />
            )}

            {/* Remove Icon */}
            <Popconfirm
              placement="rightBottom"
              title={text}
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleRemoveFile(file?.uid)}
            >
              <CloseCircleFilled className="closeButton" />
            </Popconfirm>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MultipleFileUploader;
