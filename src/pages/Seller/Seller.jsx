import React, { useEffect } from "react";
import styles from "./Seller.module.css";
import cx from "classnames";
import Spinner from "../../component/Spinner/Spinner";
import { Breadcrumb, Button, message, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  SellerDescription,
  SellerGeneral,
  SellerLogos,
  SellerPlan,
  SellerTermsAndConditions,
} from "..";
import {
  useGetSellerInformation,
  useUpdateSeller,
} from "../../apis/SellerApis";
import { current } from "@reduxjs/toolkit";
const tabs = ["General", "Description", "Logos", "TermsAndConditions", "Plan"];
const Seller = () => {
  const [active, setActive] = useState("General");
  const [sellerData, setSellerData] = useState({});
  const [plans, setPlans] = useState([]);
  const [general, setGeneral] = useState({});
  const [logoData, setLogoData] = useState({
    logotypes_image_data: {
      theme: { type: "M", object_id: 239, image_alt: "" },
      mail: { type: "M", object_id: 240, image_alt: "" },
    },
    file_logotypes_image_icon: { theme: "", mail: "" },
    type_logotypes_image_icon: { theme: "local", mail: "local" },
    is_high_res_logotypes_image_icon: { theme: "N", mail: "N" },
  });
  const [changed, setChanged] = useState("");
  const { data, isLoading } = useGetSellerInformation();
  const formData = new FormData();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoading: updateLoading, mutate } = useUpdateSeller();
  const queryClient = useQueryClient();
  useEffect(() => {
    setPlans(data?.data?.plans);
    setSellerData(data?.data?.company_data);
    setLogo();
    console.log("hello")
  }, [data]);
  const handleFinish = (values) => {
    console.log(values);
  };
  const setLogo = () => {
    let temp = { ...logoData };
    temp.logotypes_image_data.theme.image_alt =
      data?.data?.company_data?.logos?.theme?.image?.alt;
    temp.logotypes_image_data.mail.image_alt =
      data?.data?.company_data?.logos?.mail?.image?.alt;
    setLogoData(temp);
  };

  const handleFinishFailed = () => {};
  // handle form submit
  const handleFormSubmit = () => {
    let temp = { ...sellerData };
    let logos={...logoData}
    console.log("🚀 ~ file: Seller.jsx:76 ~ handleFormSubmit ~ finalData:", logos)
    delete temp.logos;
    let finalData = {
      ...logos,
      company_id: sellerData?.company_id,
      company_data: {
        ...temp,
        ...general,
        plan_id: changed ? changed : sellerData?.plan_id,
      },
    };
    formData.append("company_data", JSON.stringify(finalData));
    try {
      mutate(formData, {
        onSuccess: (response) => {
          queryClient.invalidateQueries(["seller_information"]);
        },
        onError: (error) => {
          console.log(error.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getCompanyData = () => {
    return data?.data?.company_data;
  };
  const getCountries = () => {
    let temp = Object.entries(data?.data?.countries).map(([value, label]) => ({
      label,
      value,
    }));
    return temp;
  };
  // get states
  const getStates = () => {
    return data?.data?.states;
  };
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return (
          <SellerDescription
            sellerData={sellerData}
            setSellerData={setSellerData}
          />
        );
      case tabs[2]:
        return (
          <SellerLogos
            sellerData={sellerData}
            setSellerData={setSellerData}
            logoData={logoData}
            setLogoData={setLogoData}
          />
        );
      case tabs[3]:
        return (
          <SellerTermsAndConditions
            sellerData={sellerData}
            setSellerData={setSellerData}
          />
        );
      case tabs[4]:
        return (
          <SellerPlan
            plans={plans}
            sellerData={sellerData}
            changed={changed}
            setChanged={setChanged}
          />
        );
      default:
        return (
          <SellerGeneral
            vendorData={getCompanyData()}
            countries={getCountries()}
            states={getStates()}
            setGeneral={setGeneral}
            handleFormSubmit={handleFinish}
            handleFinishFailed={handleFinishFailed}
            form={form}
          />
        );
    }
  };
  if (isLoading || updateLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Seller information</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button type="primary" onClick={() => handleFormSubmit()}>
          Save Changes
        </Button>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.left}>
          {tabs.map((dat, i) => (
            <div
              className={cx(
                styles.button,
                active === dat ? styles.bgColor : null
              )}
              key={i}
              onClick={() => setActive(dat)}
            >
              {dat}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tab_body}>
        <div className={styles.tab_body_left}>{getContainerFromTab()}</div>
        <div className={styles.tab_body_right}>
          <div className={styles.vendor_menu}>
            <div className={styles.menu_title}>
              <h4>Menu</h4>
            </div>
            <div className={styles.menu_list}>
              <div onClick={() => navigate("../Products/Products")}>
                View vendor products
              </div>
              <div>View vendor admins</div>
              <div onClick={() => navigate("../Orders/View Orders")}>
                View vendor orders
              </div>
            </div>
          </div>
          <div className={styles.vendor_statistics}>
            <div className={styles.stat_title}>
              <h4>Vendor's statistics</h4>
            </div>
            <div className={styles.statistic_list}>
              <div>
                <p>Balance</p> <p>रु{"33000"}</p>
              </div>
              <div>
                <p>Orders</p> <p>{5}</p>
              </div>
              <div>
                <p>Sales</p> <p>रु{0}</p>
              </div>
              <div>
                <p>Income</p> <p>रु{829}</p>
              </div>
              <div>
                <p>Active products</p> <p>{1}</p>
              </div>
              <div>
                <p>Out of stock</p> <p>{0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
