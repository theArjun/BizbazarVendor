import React, { useState } from "react";
import styles from "./ViewShippingMethod.module.css";
import { Checkbox, Modal, Input, Radio } from "antd";
import { Select } from "antd";
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

function ViewShippingMethod() {
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
      <div className={styles.title}>Create Shipping Method</div>
      <h3>Information</h3>
      <div className={styles.section}>
        <label>Rate Calculation</label>{" "}
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "disabled",
              disabled: true,
              label: "Disabled",
            },
            {
              value: "Yiminghe",
              label: "yiminghe",
            },
          ]}
        />
      </div>
      <div className={styles.section}>
        <label>
          Name<span className={styles.red}> *</span> :
        </label>{" "}
        <Input placeholder="Basic usage" />
      </div>
      <div className={styles.section}>
        <label>Status :</label>{" "}
        <div style={{ display: "flex" }}>
          <Radio defaultChecked={false} disabled={false}>
            Disabled
          </Radio>
          <Radio defaultChecked disabled={false}>
            Disabled
          </Radio>
          <div />
        </div>
      </div>
      <div className={styles.section}>
        <label>Icon :</label>
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
      </div>
      <div className={styles.section}>
        <label>Delevery Time:</label>{" "}
        <div>
          <Input placeholder="Basic usage" style={{ width: "100px" }} />
          <br />
          The delivery time appears next to the name of the shipping method. If
          you use realtime shipping rate calculation, your shipping service may
          provide its own delivery time. The time provided by the shipping
          service will be displayed instead of the time you specify here.
        </div>
      </div>
      <span></span>
      {/* <div className={styles.errorSection}>It is Mandatory</div> */}
      <div className={styles.section}>
        <div>Detailed description:</div>
        <ReactQuill className={styles.inputQuill} theme="snow" />
      </div>
      <h3>Ability</h3>
      <div className={styles.section}>
        <label>User Group :</label>{" "}
        <div style={{ display: "flex" }}>
          <Checkbox>All </Checkbox> <Checkbox>Guest </Checkbox>{" "}
          <Checkbox>Registered </Checkbox>
          <div />
        </div>
      </div>
      <div className={styles.section}>
        <label>Owner :</label>{" "}
        <div style={{ display: "flex" }}>
          Butwal
          <div />
        </div>
      </div>
      <div className={styles.section}>
        <label>Weight:</label>{" "}
        <div>
          <Input placeholder="Min" style={{ width: "100px" }} />-{" "}
          <Input placeholder="Max" style={{ width: "100px" }} />
        </div>
      </div>

      <div className={styles.section}>
        <label>Allowed Payment :</label>{" "}
        <div style={{ display: "flex" }}>
          <Checkbox>Connect Credit card</Checkbox>
          <Checkbox>IMEPay </Checkbox>
          <Checkbox>Khalti </Checkbox>
          <Checkbox>PAY BY CARD (DEBIT/CREDIT/PREPAID) </Checkbox>
          <Checkbox>IMEPay </Checkbox>
          <Checkbox> Phone ordering </Checkbox>
          <Checkbox> Money Order </Checkbox>
          <Checkbox> C.O.D </Checkbox>
          <div />
        </div>
      </div>
      <div className={styles.section}>
        <label>Method:</label>{" "}
        <div style={{ display: "flex" }}>
          <Checkbox> Purchase Order</Checkbox>
          <Checkbox> Personal Check </Checkbox>
          <Checkbox> Government Check </Checkbox>
          <Checkbox> Traveller's Check </Checkbox>

          <div />
        </div>
      </div>
    </div>
  );
}

export default ViewShippingMethod;
