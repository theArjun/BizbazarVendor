import React, { useEffect, useState } from "react";
import styles from "./Promotion.module.css";
import cx from "classnames";
import { Breadcrumb, Button, message } from "antd";
import General from "../AddCatalogPromotion/General/General";
import { useUpdatePromotion } from "../../../apis/PromotionApi";
import Conditions from "../AddCatalogPromotion/Conditions/Conditions";
import Bonuses from "../AddCatalogPromotion/Bonuses/Bonuses";
import Spinner from "../../../component/Spinner/Spinner";
const VendorPromotion = ({ data, getData, loading, setLoading }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [bonuses, setBonuses] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [image, setImage] = useState("");
  const [generalData, setGeneralData] = useState({
    zone: "catalog",
    name: "",
    detailed_description: "",
    short_description: "",
    from_date: "",
    to_date: "",
    priority: 0,
    stop_other_rules: "N",
    status: "A",
  });
  const [conditionValues, setConditionValues] = useState({
    set: "all",
    set_value: 1,
  });
  const { isLoading, mutate, isError } = useUpdatePromotion();
  const getDivision = () => {
    switch (activeTab) {
      case "General":
        return (
          <General
            image={image}
            setImage={setImage}
            generalData={generalData}
            setGeneralData={setGeneralData}
            data={data}
          />
        );
      case "Conditions":
        return (
          <Conditions
            conditions={conditions}
            setConditions={setConditions}
            conditionValues={conditionValues}
            setConditionValues={setConditionValues}
          />
        );

      default:
        return <Bonuses bonuses={bonuses} setBonuses={setBonuses} />;
    }
  };
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
    var month = String(date.getUTCMonth() + 1).padStart(2, "0"); //months from 1-12
    var day = String(date.getUTCDate()).padStart(2, "0");
    var year = date.getUTCFullYear();
    let new_date = `${year}-${month}-${day}`;
    return new_date;
  };
  const savePromotion = () => {
    try {
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
          promotion_id: data?.promotion_id,
          promotion_data: {
            ...generalData,
            from_date: formatDate(generalData.from_date),
            to_date: formatDate(generalData.to_date),
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
        // Lets update promotion through mutate
        mutate(formData, {
          onSuccess: (response) => {
            getData();
            console.log(response, "promotion updated success");
          },
          onError: (error) => {
            console.log("error on updating promotion, ", error);
          },
        });
      } else {
        message.error("Name is necessary to create a promotion.");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  // to display data
  useEffect(() => {
    getGeneralData(data);
    getConditions(data);
    getConditionValues(data);
    getBonuses(data);
  }, [data]);
  const getGeneralData = (g_data) => {
    let temp = { ...generalData };
    temp.name = g_data?.name;
    temp.detailed_description = g_data?.detailed_description;
    temp.short_description = g_data?.short_description;
    temp.from_date = getTimeAndDate(g_data?.from_date);
    temp.to_date = getTimeAndDate(g_data?.to_date);
    temp.priority = g_data?.priority;
    temp.stop_other_rules = g_data?.stop_other_rules;
    setGeneralData(temp);
  };
  const getConditions = (c_data) => {
    setConditions(
      !c_data?.conditions.length
        ? []
        : Object.values(c_data?.conditions?.conditions)
    );
  };
  const getConditionValues = (c_data) => {
    let temp = { ...conditionValues };
    temp.set = c_data?.conditions?.set;
    temp.set_value = c_data?.conditions?.set_value;
    setConditionValues(temp);
  };
  const getBonuses = (b_data) => {
    setBonuses(!b_data?.bonuses.length ? [] : Object.values(b_data?.bonuses));
  };
  // formatting date
  const formatDate = (date) => {
    if (date) {
      let date_arr = date.split("-");
      let new_date = `${date_arr[2]}/${date_arr[1]}/${date_arr[0]}`;
      return new_date;
    }
    return;
  };
  if (isLoading) return <Spinner />;
  return (
    <React.Fragment>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Edit Catalog Promotion</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={savePromotion} type="primary">
          Save changes
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
};

export default VendorPromotion;
