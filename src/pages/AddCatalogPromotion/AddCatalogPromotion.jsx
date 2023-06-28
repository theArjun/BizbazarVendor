import React, { useState } from "react";
import styles from "./AddCatalogPromotion.module.css";
import cx from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  CatalogPromotionBonuses,
  CatalogPromotionConditions,
  CatalogPromotionGeneral,
} from "..";
import { Breadcrumb, Button, message } from "antd";
import { useCreatePromotion } from "../../apis/PromotionApi";
function AddCatalogPromotion() {
  const [activeTab, setActiveTab] = useState("General");
  const [bonuses, setBonuses] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [image, setImage] = useState("");
  const { mutate: createMutate, isLoading: createLoading } =
    useCreatePromotion();

  let date = new Date();
  const [generalData, setGeneralData] = useState({
    zone: "catalog",
    name: "",
    detailed_description: "",
    short_description: "",
    from_date: date.getTime(),
    to_date: date.getTime(),
    priority: 0,
    stop_other_rules: "N",
    status: "A",
  });

  const [conditionValues, setConditionValues] = useState({
    set: "all",
    set_value: 1,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    if (generalData.name) {
      const formData = new FormData();
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
        update[i + 1] = { ...current };
        return update;
      }, {});
      // for preparing bonuses data
      let temp_bonuses = bonuses.reduce((update, current, i) => {
        update[i] = { ...current };
        return update;
      }, {});
      let prepareData = {
        promotion_id: 0,
        promotion_data: {
          ...generalData,
          from_date: formatDate(generalData.from_date) || date.getTime() / 1000,
          to_date: formatDate(generalData.to_date) || date.getTime() / 1000,
          bonuses: { ...temp_bonuses },
          conditions: {
            ...conditionValues,
            conditions: { ...temp_conditions },
          },
        },
      };
      if (image) {
        // append to form data
        formData.append("file", image);
        prepareData = { ...prepareData, ...image_data };
        formData.append("promotion_data", JSON.stringify(prepareData));
      } else {
        formData.append("promotion_data", JSON.stringify(prepareData));
      }
      createMutate(formData, {
        onSuccess: (res) => {
          queryClient.invalidateQueries(["promotions"]);
          navigate("../Marketing/Promotions");
        },
      });
    } else {
      message.error("Name is necessary to create a promotion.");
    }
  };
  // formatting date
  const formatDate = (date) => {
    let myDate = new Date(date.$y, date.$M, date.$D);
    return myDate.getTime() / 1000;
  };
  return (
    <React.Fragment>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Add Catalog Promotion</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
          loading={createLoading}
          onClick={createPromotion}
          type="primary"
        >
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
