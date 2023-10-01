import { Button, DatePicker, Input } from "antd";
import React, { useState } from "react";
import styles from "./General.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function General() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <div>
          Name<label style={{ color: "red" }}>*</label>:
        </div>

        <Input className={styles.nameInput} type="text" />
      </label>
      <label className={styles.label}>
        <div>Detailed description:</div>
        <ReactQuill className={styles.inputQuill} theme="snow" />
      </label>
      <label className={styles.label}>
        <div>Short description:</div>
        <ReactQuill className={styles.inputQuill} theme="snow" />
      </label>
      <label className={styles.label}>
        <div>Image :</div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </label>
      <label className={styles.label}>
        <div>Use available period: </div>
        <input className={styles.checkbox} type="checkbox" />
      </label>
      <label className={styles.label}>
        <div>Available from:</div>
        <DatePicker onChange={""} className={styles.date_picker} />
      </label>
      <label className={styles.label}>
        <div>Available to:</div>
        <DatePicker onChange={""} className={styles.date_picker} />
      </label>
      <label className={styles.label}>
        <div>Priority:</div>
        <Input className={styles.Priority} type="text" />
      </label>
      <label className={styles.label}>
        <div>Stop other rules : </div>
        <input className={styles.checkbox} type="checkbox" />
      </label>
      <label className={styles.label1}>
        If enabled, the other promotions are not applied.
      </label>
    </div>
  );
}

export default General;
