import styles from "./Logos.module.css";
import { Input } from "antd";
import { AiFillMessage } from "react-icons/ai";
import ImageUploaderForPromotion from "../../../../component/ImageUploader/ImageUploaderForPromotion";
const Logos = ({sellerData, logoData, setLogoData, customerImage, setCustomerImage, invoiceImage, setInvoiceImage}) => {
  const getImage = (image) => {
    if (!!image) {
      return [
        {
          uid: "0",
          name: "theme_logo.png",
          status: "done",
          url: image?.image?.image_path,
          image_id: image?.logo_id,
        },
      ];
    }
  };
  return (
    <div className={styles.logos}>
      <div className={styles.logo_container}>
        <div className={styles.logo_title}>
          <h4>Site logo</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
            imageList={getImage(sellerData?.theme)}
            image={customerImage}
            setImage={setCustomerImage}
            logoData={logoData}
            setLogoData={setLogoData}
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
          <h4>Email logo</h4>
        </div>
        <div className={styles.logo_image}>
          {" "}
          <ImageUploaderForPromotion
          imageList={getImage(sellerData?.mail)}
            image={invoiceImage}
            setImage={setInvoiceImage}
            logoData={logoData}
            setLogoData={setLogoData}
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
