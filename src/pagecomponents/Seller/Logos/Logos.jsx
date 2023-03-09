import React from "react";
import styles from "./Logos.module.css";
import { Input } from "antd";
import { AiFillMessage } from "react-icons/ai";
import ImageUploaderForPromotion from "../../../component/ImageUploader/ImageUploaderForPromotion";
import { useState } from "react";
const Logos = ({sellerData, setSellerData, logoData, setLogoData}) => {
  const [customerImage, setCustomerImage] = useState({});
  const [invoiceImage, setInvoiceImage] = useState({});

  //function to get image
  const getImage = (image) => {
    if (!!image) {
      return [
        {
          uid: "0",
          name: "theme_logo.png",
          status: "done",
          url: image?.image_path,
          pair_id: image?.image_x,
          image_id: image?.image_y,
        },
      ];
    } else {
      return [];
    }
  };
  return (
    <div className={styles.logos}>
      <div className={styles.logo_container}>
        <div className={styles.logo_title}>
          <h4>Logo for the customer area</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
            imageList={getImage(sellerData?.logos?.theme?.image)}
            image={customerImage}
            setImage={setCustomerImage}
          />
        </div>
        <div className={styles.logo_company}>
          <Input
            style={{ maxWidth: "300px" }}
            addonBefore={<AiFillMessage size={20} color={"gray"} />}
          value={logoData?.logotypes_image_data.theme.image_alt}
            onChange={(e)=>{
              let temp={...logoData}
              temp.logotypes_image_data.theme.image_alt=e.target.value;
              setLogoData(temp)
            }}
          />
        </div>
      </div>
      <div></div>
      <div className={styles.logo_container}>
        <div className={styles.logo_title}>
          <h4>Logo for invoices</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
          imageList={getImage(sellerData?.logos?.mail?.image)}
            image={invoiceImage}
            setImage={setInvoiceImage}
          />
        </div>
        <div className={styles.logo_company}>
          <Input
            style={{ maxWidth: "300px" }}
            addonBefore={<AiFillMessage size={20} color={"gray"} />}
            value={logoData?.logotypes_image_data.mail.image_alt}
            onChange={(e)=>{
              let temp={...logoData}
              temp.logotypes_image_data.mail.image_alt=e.target.value;
              setLogoData(temp)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Logos;
