import React, { useState } from "react";
import { Breadcrumb, Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useGetThemes, useUpdateTheme } from "../../../apis/LogosAndStylesApi";
import Spinner from "../../../component/Spinner/Spinner";
import Logo from "../../../features/Setting/LogosAndStyle/Logos/Logo";
import styles from "./LogosAndStyle.module.css";

const INITIAL_THEME_CONDITION = {
  removed_image_pair_ids: {},
  logotypes_image_data: {
    theme: { type: "M", object_id: "145", image_alt: "Hello" },
    mail: { type: "M", object_id: "125", image_alt: "Hello" },
  },
  file_logotypes_image_icon: { theme: "", mail: "" },
  type_logotypes_image_icon: { theme: "local", mail: "local" },
  is_high_res_logotypes_image_icon: { theme: "N", mail: "N" },
};

const LogosAndStyle = () => {
  const { isLoading: themeLoading, data: themeData } = useGetThemes();
  const { isLoading: updateLoading, mutate } = useUpdateTheme();
  const [logoData, setLogoData] = useState(INITIAL_THEME_CONDITION);
  const [customerImage, setCustomerImage] = useState("");
  const [invoiceImage, setInvoiceImage] = useState("");
  const formData = new FormData();
  const queryClient = useQueryClient();

  const getThemeData = () => {
    return themeData?.data ?? [];
  };

  const getLogo = () => {
    return (
      <Logo
        sellerData={getThemeData()}
        logoData={logoData}
        setLogoData={setLogoData}
        customerImage={customerImage}
        setCustomerImage={setCustomerImage}
        invoiceImage={invoiceImage}
        setInvoiceImage={setInvoiceImage}
      />
    );
  };

  const handleSubmit = () => {
    formData.append("themes_data", JSON.stringify(logoData));
    if (customerImage) {
      formData.append("theme", customerImage);
    }
    if (invoiceImage) {
      formData.append("mail", invoiceImage);
    }
    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["themes"]);
      },
    });
  };

  if (themeLoading || updateLoading) {
    return <Spinner />;
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
        <Button type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
      <div className={styles.logos_and_style_body}>{getLogo()}</div>
    </div>
  );
};

export default LogosAndStyle;
