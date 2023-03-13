import React from "react";
import styles from "./LogosAndStyle.module.css";
import { Breadcrumb, Button, Card } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useGetThemes, useUpdateTheme } from "../../../apis/LogosAndStylesApi";
import { useState } from "react";
import Spinner from "../../../component/Spinner/Spinner";
import Logo from "../../../pagecomponents/Setting/LogosAndStyle/Logos/Logo";
const INITIAL_THEME_CONDITION={
  removed_image_pair_ids: { },
  logotypes_image_data: {
    theme: { type: "M", object_id: "145", image_alt: "Hello" },
    mail: { type: "M", object_id: "125", image_alt: "Hello" },
  },
  file_logotypes_image_icon: { theme: "", mail: "" },
  type_logotypes_image_icon: { theme: "local", mail: "local" },
  is_high_res_logotypes_image_icon: { theme: "N", mail: "N" },
}
const  LogosAndStyle=()=> {
  const {isLoading:themeLoading, data:themeData}=useGetThemes()
  const {isLoading:updateLoading, mutate}=useUpdateTheme()
  const [logoData, setLogoData] = useState(INITIAL_THEME_CONDITION);
  const [customerImage, setCustomerImage] = useState("");
  const [invoiceImage, setInvoiceImage] = useState("");
  const formData=new FormData();
  const queryClient=useQueryClient()
  const getThemeData=()=>{
    if(themeData){
      return themeData?.data;
    }

  }
  // get Logos section
  const getLogo=()=>{
      return <Logo
      sellerData={getThemeData()}
      logoData={logoData}
      setLogoData={setLogoData}
      customerImage={customerImage}
      setCustomerImage={setCustomerImage}
      invoiceImage={invoiceImage}
      setInvoiceImage={setInvoiceImage}
      />
  }
  // handle submit 
  const handleSubmit=()=>{
        formData.append("themes_data",JSON.stringify(logoData))
        if (customerImage) {
          formData.append("theme", customerImage);
        }
        if (invoiceImage) {
          formData.append("mail", invoiceImage);
        }
        mutate(formData,{
          onSuccess:()=>{
            queryClient.invalidateQueries(['themes']);
          }
        })
  }
  if(themeLoading || updateLoading){
    return <Spinner/>
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Logos and styles</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button type="primary" onClick={handleSubmit}>Save Changes</Button>
      </div>
      <div className={styles.logos_and_style_body}>
      {getLogo()}
      </div>
    </div>
  );
}

export default LogosAndStyle;
