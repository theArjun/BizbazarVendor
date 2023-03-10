import React from "react";
import styles from "./LogosAndStyle.module.css";
import { Breadcrumb, Button, Card } from "antd";
import { Logos } from "../..";
import { useQueryClient } from "@tanstack/react-query";
import { useGetThemes, useUpdateTheme } from "../../../apis/LogosAndStylesApi";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../../component/Spinner/Spinner";
function LogosAndStyle() {
  const {isLoading:themeLoading, data:themeData}=useGetThemes()
  const {isLoading:updateLoading, mutate}=useUpdateTheme()
  const [logoData, setLogoData] = useState({
    removed_image_pair_ids: { },
    logotypes_image_data: {
      theme: { type: "M", object_id: "", image_alt: "" },
      mail: { type: "M", object_id: "", image_alt: "" },
    },
    file_logotypes_image_icon: { theme: "", mail: "" },
    type_logotypes_image_icon: { theme: "local", mail: "local" },
    is_high_res_logotypes_image_icon: { theme: "N", mail: "N" },
  });
  const [customerImage, setCustomerImage] = useState("");
  const [invoiceImage, setInvoiceImage] = useState("");
  const formData=new FormData();
  const queryClient=useQueryClient()
  useEffect(()=>{
    setLogo()
  },[themeData])
  const getThemeData=()=>{
    if(themeData){
      return themeData?.data;
    }
    return

  }
   // set logo data 
   const setLogo = () => {
    let temp = { ...logoData };
    temp.logotypes_image_data.theme.image_alt =
      themeData?.data?.theme?.image?.alt;
    temp.logotypes_image_data.mail.image_alt =
      themeData?.data?.mail?.image?.alt;
    temp.logotypes_image_data.theme.object_id =
      themeData?.data?.theme?.logo_id;
    temp.logotypes_image_data.mail.object_id =
      themeData?.data?.mail?.logo_id;
    setLogoData(temp);
  };
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
      <Card className={styles.logos_and_style_body}>
       {logoData.logotypes_image_data.mail.object_id && getThemeData()? <Logos
        sellerData={getThemeData()}
        logoData={logoData}
        setLogoData={setLogoData}
        customerImage={customerImage}
        setCustomerImage={setCustomerImage}
        invoiceImage={invoiceImage}
        setInvoiceImage={setInvoiceImage}
        />:''}
      </Card>
    </div>
  );
}

export default LogosAndStyle;
