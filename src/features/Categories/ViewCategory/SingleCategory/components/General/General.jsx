import React from "react";
import styles from "./General.module.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Checkbox, Image, Input, Tag } from "antd";
const General = ({ data }) => {
  const options = [
    {
      label: "All",
      value: "all",
      disabled: true,
    },
    {
      label: "Guest",
      value: "guest",
      disabled: true,
    },
    {
      label: "Registered user",
      value: "Orange",
      disabled: true,
    },
    {
      label: "Apply to all subcategories",
      value: "apply_to_all",
      disabled: true,
    },
  ];
  // Function for getting  tags of status
  const getStatusTag = (status) => {
    switch (status) {
      case "A":
        return <Tag color="green">Active</Tag>;
      case "H":
        return <Tag color="purple">Hidden</Tag>;
      case "D":
        return <Tag color="red">Disabled</Tag>;
      default:
        return <Tag color="cyan">Unknown</Tag>;
    }
  };
  // Getting time and date function
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  return (
    <div className={styles.category_general}>
      <h4>Information</h4>
      <div className={styles.information}>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Location:</div>
          <div className={styles.value}>{data?.localization || ""}</div>
        </div>{" "}
        <div className={styles.category_general_container}>
          <div className={styles.label}>Name:</div>
          <div className={styles.value}>{data?.category || ""}</div>
        </div>{" "}
        <div className={styles.category_general_container}>
          <div className={styles.label}>Storefront:</div>
          <div className={styles.value}>
            <Input
              disabled
              value={data?.storefront_id === "0" ? "All storefronts" : ""}
            />
          </div>
        </div>{" "}
        <div className={styles.category_general_container}>
          <div className={styles.label}>Description:</div>
          <div className={styles.value}>
            <ReactQuill
              theme="snow"
              value={data?.description}
              readOnly={true}
            />
          </div>
        </div>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Status:</div>
          <div className={styles.value}>{getStatusTag(data?.status)}</div>
        </div>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Images:</div>
          <div className={styles.value}>
            <Image
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
              src={data?.main_pair?.detailed?.image_path}
              alt={data?.main_pair?.detailed?.alt}
              fallback="/image_not_found.png"
            />
          </div>
        </div>{" "}
      </div>
      <h4>Meta data</h4>
      <div className={styles.meta_data}>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Page title:</div>
          <div className={styles.value}>{data?.page_title || ""}</div>
        </div>{" "}
        <div className={styles.category_general_container}>
          <div className={styles.label}>Meta description:</div>
          <div className={styles.value}>{data?.meta_description || ""}</div>
        </div>{" "}
        <div className={styles.category_general_container}>
          <div className={styles.label}>Meta keywords:</div>
          <div className={styles.value}>{data?.meta_keywords || ""}</div>
        </div>{" "}
      </div>
      <h4>Availability</h4>
      <div className={styles.availability}>
        <div className={styles.category_general_container}>
          <div className={styles.label}>User groups:</div>
          <div className={styles.value}>
            <Checkbox.Group options={options} />
          </div>
        </div>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Position:</div>
          <div className={styles.value}>{data?.position}</div>
        </div>
        <div className={styles.category_general_container}>
          <div className={styles.label}>Creation date:</div>
          <div className={styles.value}>{getTimeAndDate(data?.timestamp)}</div>
        </div>
      </div>
    </div>
  );
};

export default General;
