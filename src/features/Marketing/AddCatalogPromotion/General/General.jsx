import { Button, DatePicker, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./General.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import ImageUploaderForPromotion from "../../../../component/ImageUploader/ImageUploaderForPromotion";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
function General({
  data,
  setGeneralData,
  generalData,
  image,
  setImage,
  deleteImage,
  setDeleteImage,
}) {
  console.log(generalData.from_date);
  //function to get image
  const getImage = (image) => {
    if (!!image) {
      return [
        {
          uid: "0",
          name: "main_image.jpg",
          status: "done",
          url: image?.icon?.image_path,
          pair_id: image?.pair_id,
          image_id: image?.image_id,
        },
      ];
    } else {
      return [];
    }
  };
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <div>
          Name<label style={{ color: "red" }}>*</label>:
        </div>

        <Input
          className={styles.nameInput}
          type="text"
          value={generalData.name}
          onChange={(e) => {
            let data = { ...generalData };
            data.name = e.target.value;
            setGeneralData(data);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Detailed description:</div>
        <ReactQuill
          className={styles.inputQuill}
          theme="snow"
          value={generalData.detailed_description}
          onChange={(e) => {
            let data = { ...generalData };
            data.detailed_description = e;
            setGeneralData(data);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Short description:</div>
        <ReactQuill
          className={styles.inputQuill}
          value={generalData.short_description}
          theme="snow"
          onChange={(e) => {
            let data = { ...generalData };
            data.short_description = e;
            setGeneralData(data);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Image :</div>
        <div className={styles.promotion_image}>
          <ImageUploaderForPromotion
            image={image}
            setImage={setImage}
            imageList={getImage(data?.image)}
            deleteImage={deleteImage}
            setDeleteImage={setDeleteImage}
            message={message}
          />
        </div>
      </label>
      <label className={styles.label}>
        <div>Available from:</div>
        <div>
          <DatePicker
            allowClear={false}
            className={styles.datePicker}
            value={dayjs(generalData?.from_date)}
            format={dateFormat}
            onChange={(date) => {
              let data = {
                ...generalData,
                from_date: date,
              };
              setGeneralData(data);
            }}
          />
        </div>
      </label>
      <label className={styles.label}>
        <div>Available to:</div>
        <div>
          <DatePicker
            allowClear={false}
            className={styles.datePicker}
            value={dayjs(generalData?.to_date)}
            format={dateFormat}
            onChange={(date) => {
              let data = {
                ...generalData,
                to_date: date,
              };
              setGeneralData(data);
            }}
          />
        </div>
      </label>
      <label className={styles.label}>
        <div>Priority:</div>
        <InputNumber
          className={styles.Priority}
          type="number"
          min={0}
          value={generalData.priority}
          onChange={(e) => {
            let data = { ...generalData };
            data.priority = e;
            setGeneralData(data);
          }}
        />
      </label>
      <label className={styles.label}>
        <div>Stop other rules : </div>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={generalData.stop_other_rules == "Y" ? true : false}
          onChange={(e) => {
            let data = { ...generalData };
            data.stop_other_rules = e.target.checked ? "Y" : "N";
            setGeneralData(data);
          }}
        />
      </label>
      <label className={styles.label1}>
        If enabled, the other promotions are not applied.
      </label>
    </div>
  );
}

export default General;
