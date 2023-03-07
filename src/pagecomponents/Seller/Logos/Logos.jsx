import React from "react";
import styles from "./Logos.module.css";
import { Input } from "antd";
import { AiFillMessage } from "react-icons/ai";
import ImageUploaderForPromotion from "../../../component/ImageUploader/ImageUploaderForPromotion";
import { useState } from "react";
const Logos = () => {
  const [customerImage, setCustomerImage] = useState();
  const [invoiceImage, setInvoiceImage] = useState();
  return (
    <div className={styles.logos}>
      <div className={styles.logo_container}>
        <div className={styles.logo_title}>
          <h4>Logo for the customer area</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
            imageList={{}}
            image={customerImage}
            setImage={setCustomerImage}
          />
        </div>
        <div className={styles.logo_company}>
          <Input
            style={{ maxWidth: "300px" }}
            addonBefore={<AiFillMessage size={20} color={"gray"} />}
            defaultValue="Accounting Vendor"
          />
        </div>
      </div>

      <div className={styles.logo_container}>
        <div className={styles.logo_title}>
          <h4>Logo for invoices</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
            imageList={{}}
            image={invoiceImage}
            setImage={setInvoiceImage}
          />
        </div>
        <div className={styles.logo_company}>
          <Input
            style={{ maxWidth: "300px" }}
            addonBefore={<AiFillMessage size={20} color={"gray"} />}
            defaultValue="Accounting Vendor"
          />
        </div>
      </div>
    </div>
  );
};

export default Logos;
