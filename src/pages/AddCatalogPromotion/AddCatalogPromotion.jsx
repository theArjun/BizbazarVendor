import React, { useEffect, useState } from "react";
import styles from "./AddCatalogPromotion.module.css";
import cx from "classnames";
import {
  CatalogPromotionBonuses,
  CatalogPromotionConditions,
  CatalogPromotionGeneral,
} from "..";
import { Breadcrumb, Button } from "antd";
import { apicall } from "../../utils/apicall/apicall";
function AddCatalogPromotion() {
  const [activeTab, setActiveTab] = useState("General");
  const [bonuses, setBonuses] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({
    zone: "",
    name: "",
    detailed_description: "",
    short_description: "",
    from_date: 0,
    to_date: 0,
    priority: 0,
    stop_other_rules: "N",
    status: "A",
  });
  const [conditionValues, setConditionValues] = useState({
    set: "all",
    set_value: 1,
  });
  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return (
          <CatalogPromotionGeneral
            image={image}
            setImage={setImage}
            generalData={generalData}
            setGeneralData={setGeneralData}
          />
        );
      case "Conditions":
        return (
          <CatalogPromotionConditions
            conditions={conditions}
            setConditions={setConditions}
            conditionValues={conditionValues}
            setConditionValues={setConditionValues}
          />
        );

      default:
        return (
          <CatalogPromotionBonuses bonuses={bonuses} setBonuses={setBonuses} />
        );
    }
  };
  const createPromotion = async () => {
    setLoading(true);
    const formData = new FormData();
    // append to form data
    formData.append("file", image);
    let image_data = {
      promo_main_image_data: {
        0: {
          pair_id: "",
          type: "M",
          object_id: "0",
          image_alt: "",
        },
      },
      file_promo_main_image_icon: {
        0: "promo_main",
      },
      type_promo_main_image_icon: {
        0: "local",
      },
      is_high_res_promo_main_image_icon: {
        0: "N",
      },
    };
    // for preparing condition data
    let temp_conditions = conditions.reduce((update, current, i) => {
      update[i] = { ...current };
      return update;
    }, {});
    // for preparing bonuses data
    let temp_bonuses = bonuses.reduce((update, current, i) => {
      update[i] = { ...current };
      return update;
    }, {});
    let prepareData = {
      ...generalData,
      bonuses: { ...temp_bonuses },
      conditions: {
        ...conditionValues,
        conditions: { ...temp_conditions },
      },
    };
    if (image) {
      console.log(
        "🚀 ~ file: AddCatalogPromotion.jsx:91 ~ createPromotion ~ image",
        image
      );
      prepareData = { ...prepareData, ...image_data };
      console.log(
        "🚀 ~ file: AddCatalogPromotion.jsx:92 ~ createPromotion ~ prepareData",
        prepareData
      );
    }
    formData.append("promotion_data", prepareData);
    console.log(
      "🚀 ~ file: AddCatalogPromotion.jsx:96 ~ createPromotion ~ formData",
      prepareData
    );
    let result = await apicall({
      url: "Promotions",
      method: "post",
      body: formData,
    });

    if (result) {
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <React.Fragment>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Add Catalog Promotion</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button loading={loading} onClick={createPromotion} type="primary">
          Create promotion
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.tabWrapper}>
          {["General", "Conditions", "Bonuses"].map((dat, i) => (
            <div
              className={cx(
                styles.tab,
                dat === activeTab ? styles.bgColor : null
              )}
              key={i}
              onClick={() => setActiveTab(dat)}
            >
              {dat}
            </div>
          ))}
        </div>
        <div className={styles.tabcontain}>{getDivision()}</div>
      </div>
    </React.Fragment>
  );
}

export default AddCatalogPromotion;
