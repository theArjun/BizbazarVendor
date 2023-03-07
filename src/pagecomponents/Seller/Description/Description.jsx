import React from "react";
import ReactQuill from "react-quill";
import styles from "./Description.module.css";
import "react-quill/dist/quill.snow.css";
const Description = () => {
  return (
    <div className={styles.description}>
      <div className={styles.description_body}>
        <div className={styles.description_title}>Description:</div>
        <div className={styles.description_field}>
          <ReactQuill
            theme="snow"
            value={''}
            // onChange={setDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
