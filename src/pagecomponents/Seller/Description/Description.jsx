import React from "react";
import ReactQuill from "react-quill";
import styles from "./Description.module.css";
import "react-quill/dist/quill.snow.css";
const Description = ({sellerData, setSellerData}) => {
  return (
    <div className={styles.description}>
      <div className={styles.description_body}>
        <div className={styles.description_title}>Description:</div>
        <div className={styles.description_field}>
          <ReactQuill
            theme="snow"
            value={sellerData?.company_description}
            onChange={(value)=>{
              let data={...sellerData}
              data.company_description=value
              setSellerData(data)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
