import React, { useEffect } from "react";
import { Button, Select, Form, Input } from "antd";
import styles from "./Conditions.module.css";
import ConditionTable from "./Table/ConditionTable";
import { useState } from "react";
import data from "./data.json";
import {
  useGetPromotionProducts,
  useGetPromotionUsers,
} from "../../../../apis/PromotionApi";
import AddModal from "../../../../component/AddModal/AddModal";
import { useGetFeatures } from "../../../../apis/FeatureApis";
import Axios from "../../../../config/apiConfig";
import { useGetCategories } from "../../../../apis/CategoryApi";
const condition_features = {
  PRODUCT_PRICE: "price",
  PRODUCTS: "products",
  CATAGORIES: "categories",
  PURCHASED_PRODUCTS: "purchased_products",
  USERS: "users",
  PRODUCT_FEATURE: "feature",
  USER_GROUP: "usergroup",
  SUBSCRIBED: "subscribed",
  AFFILIATE_LINK: "affiliate_link",
  REWARD_POINTS: "reward_points",
};
function Conditions({
  conditions,
  setConditions,
  setConditionValues,
  conditionValues,
}) {
  const [currentCondition, setCurrentCondition] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cdata, setCData] = useState([]);
  const [ids, setIds] = useState("");
  const [features, setFeatures] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState("");
  const {
    isLoading: productLoading,
    data: productData,
    isError,
  } = useGetPromotionProducts();
  const {
    data: categoryData,
    isError: categoryError,
    isLoading: categoryLoading,
  } = useGetCategories();
  const {
    data: usersData,
    isError: userError,
    isLoading: usersLoading,
  } = useGetPromotionUsers();
  const { isLoading: featureLoading, data: featureData } = useGetFeatures();
  useEffect(() => {
    if (featureData) {
      let temp_features = [...(featureData?.data?.features || [])];
      let feature_data = temp_features?.map((item, i) => ({
        label: item?.description,
        value: item?.feature_id,
      }));
      setFeatures(feature_data);
    }
  }, [featureData]);
  const handleTextChange = (a, b) => {
    let temp_condition = { ...conditionValues };
    temp_condition.set = b.value;
    setConditionValues(temp_condition);
  };
  const handleTextValueChange = (a, b) => {
    let temp_condition = { ...conditionValues };
    temp_condition.set_value = b.value;
    setConditionValues(temp_condition);
  };
  // handleCondition select change
  const handleConditionSelectChange = (a, b) => {
    setIds("");
    setCurrentCondition(b.value);
  };
  const handleProductFeatureSelect = async (id) => {
    setVariants([]);
    try {
      Axios.get(`features/${id}`)
        .then((result) => {
          if (result?.data) {
            let temp_variants = Object.values(result?.data?.variants)?.map(
              (item, i) => ({ label: item?.variant, value: item?.variant_id })
            );
            setVariants(temp_variants);
          }
        })
        .catch((error) =>
          console.log("Error on getting feature ", error.message)
        );
    } catch (e) {
      console.log(e.message);
    }
  };
  // lets create a function to get particular condition UI
  const getConditionByConditionName = (condition) => {
    switch (condition) {
      case condition_features.PRODUCT_PRICE:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="product_price_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.product_price}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              name="product_price_condition_value"
            >
              <Input type="number" />
            </Form.Item>
          </div>
        );
      case condition_features.PRODUCTS:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="products_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={() => setConditionValue(condition_features.PRODUCTS)}
            >
              Add products
            </Button>
            <div className={styles.count_text}>
              Products count:{" "}
              {ids.split(",")[0] === "" ? 0 : ids.split(",").length}
            </div>
          </div>
        );
      case condition_features.PURCHASED_PRODUCTS:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="purchased_products_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={() =>
                setConditionValue(condition_features.PURCHASED_PRODUCTS)
              }
            >
              Add products
            </Button>
            <div className={styles.count_text}>
              Products count:{" "}
              {ids.split(",")[0] === "" ? 0 : ids.split(",").length}
            </div>
          </div>
        );
      case condition_features.USERS:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="users_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={() => setConditionValue(condition_features.USERS)}
            >
              Add users
            </Button>
            <div className={styles.count_text}>
              Categories count:{" "}
              {ids.split(",")[0] === "" ? 0 : ids.split(",").length}
            </div>
          </div>
        );
      case condition_features.PRODUCT_FEATURE:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="product_feature"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                onSelect={handleProductFeatureSelect}
                style={{
                  width: 200,
                }}
                options={features}
              />
            </Form.Item>
            <Form.Item
              name="product_feature_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.product_features}
              />
            </Form.Item>
            <Form.Item
              name="product_feature_variant"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                onSelect={(a, b) => setVariantName(b.label)}
                style={{
                  width: 200,
                }}
                options={variants}
              />
            </Form.Item>
          </div>
        );
      case condition_features.CATAGORIES:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="categories_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={() => setConditionValue(condition_features.CATAGORIES)}
            >
              Add categories
            </Button>
            <div className={styles.count_text}>
              Categories count:{" "}
              {ids.split(",")[0] === "" ? 0 : ids.split(",").length}
            </div>
          </div>
        );
      case condition_features.USER_GROUP:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="user_group_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.user_group_condition}
              />
            </Form.Item>
            <Form.Item
              name="user_group"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.user_group}
              />
            </Form.Item>
          </div>
        );
      case condition_features.SUBSCRIBED:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="is_subscribed"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.is_subscribed}
              />
            </Form.Item>
          </div>
        );
      case condition_features.AFFILIATE_LINK:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="comes_by_affiliate"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.categories}
              />
            </Form.Item>
            <Button type="primary">Add plan</Button>
          </div>
        );
      case condition_features.REWARD_POINTS:
        return (
          <div className={styles.particular_condition}>
            <Form.Item
              name="points_on_user_account_condition"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                style={{
                  width: 200,
                }}
                options={data.points_on_user_account}
              />
            </Form.Item>
            <Form.Item
              name="points_on_user_account_value"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </div>
        );
      default:
        return (
          <div className={styles.particular_condition}>
            {" "}
            No condition is selected{" "}
          </div>
        );
    }
  };
  // handle condition values
  const setConditionValue = (condition) => {
    let temp_pro = [...productData?.data?.products];
    let temp_cat = [...categoryData?.data?.categories];
    switch (condition) {
      case condition_features.PRODUCTS:
        setCData(
          temp_pro?.map((el, i) => ({
            id: el?.product_id,
            name: el?.product,
            code: el?.product_code,
            quantity: el?.amount,
            status: el?.status,
          }))
        );
        setModalOpen(true);
        break;
      case condition_features.PURCHASED_PRODUCTS:
        setCData(
          temp_pro?.map((el, i) => ({
            id: el?.product_id,
            name: el?.product,
            code: el?.product_code,
            quantity: el?.amount,
            status: el?.status,
          }))
        );
        setModalOpen(true);
        break;
      case condition_features.CATAGORIES:
        setCData(
          temp_cat?.map((el, i) => ({
            id: el?.category_id,
            name: el?.category,
            code: el?.category_id,
            quantity: el?.product_count,
            status: el?.status,
          }))
        );
        setModalOpen(true);
        break;
      case condition_features.USERS:
        let temp_users = [...usersData?.data?.users];
        setCData(
          temp_users?.map((el, i) => ({
            id: el?.user_id,
            name: el?.firstname + " " + el?.lastname,
            code: el?.email,
            // quantity: el?.product_count,
            status: el?.status,
          }))
        );
        setModalOpen(true);
        break;
    }
  };
  // form submit function
  const onFinish = (values) => {
    let data = [...conditions];
    switch (values.condition) {
      case condition_features.PRODUCT_PRICE:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.product_price_condition,
            value: values.product_price_condition_value,
          },
        ];
        break;
      case condition_features.PRODUCTS:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.products_condition,
            value: ids,
          },
        ];
        break;
      case condition_features.CATAGORIES:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.categories_condition,
            value: ids,
          },
        ];
        break;
      case condition_features.PURCHASED_PRODUCTS:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.purchased_products_condition,
            value: ids,
          },
        ];
        break;
      case condition_features.USERS:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.users_condition,
            value: ids,
          },
        ];
        break;
      case condition_features.PRODUCT_FEATURE:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.product_feature_condition,
            value: values.product_feature_variant,
            condition_element: values.product_feature,
            value_name: variantName,
          },
        ];
        break;
      case condition_features.USER_GROUP:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.user_group_condition,
            value: values.user_group,
          },
        ];
        break;
      case condition_features.SUBSCRIBED:
        data = [
          ...conditions,
          {
            condition: values.condition,
            value: values.is_subscribed,
          },
        ];
        break;
      case condition_features.AFFILIATE_LINK:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.comes_by_affiliate,
            value: "data",
          },
        ];
        break;
      case condition_features.REWARD_POINTS:
        data = [
          ...conditions,
          {
            condition: values.condition,
            operator: values.points_on_user_account_condition,
            value: values.points_on_user_account_value,
          },
        ];
        break;
    }
    setConditions(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.condition_body}>
        <div className={styles.condition_header}>
          <div className={styles.condition_body_header_text}>
            <Select
              defaultValue={conditionValues?.set}
              onChange={handleTextChange}
              style={{
                width: 70,
              }}
              bordered={false}
              options={[
                {
                  value: "all",
                  label: "all",
                },
                {
                  value: "any",
                  label: "any",
                },
              ]}
            />{" "}
            of these conditions are{" "}
            <Select
              defaultValue={conditionValues?.set_value}
              onChange={handleTextValueChange}
              style={{
                width: 80,
              }}
              bordered={false}
              options={[
                {
                  value: 1,
                  label: "true",
                },
                {
                  value: 0,
                  label: "false",
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.condition_body_content}>
          <Form onFinish={onFinish}>
            <div className={styles.add_condition_field}>
              <div className={styles.condition_fields}>
                <Form.Item
                  className={styles.condition_field_item}
                  name="condition"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    onChange={handleConditionSelectChange}
                    style={{
                      width: 200,
                    }}
                    options={data.condition_items}
                  />
                </Form.Item>
                <div className={styles.selected_condition_content}>
                  {getConditionByConditionName(currentCondition)}
                </div>
              </div>
              <Button htmlType="submit">Add condition</Button>
            </div>
          </Form>
          <div className={styles.condition_table}>
            <ConditionTable
              conditions={conditions.map((el, i) => ({ ...el, key: i }))}
              setConditions={setConditions}
              loading={
                productLoading ||
                categoryLoading ||
                usersLoading ||
                featureLoading
              }
              productData={productData?.data?.products}
              categoryData={categoryData?.data?.categories}
              userData={usersData?.data?.users}
            />
          </div>
        </div>
        <AddModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          condition_data={cdata}
          ids={ids}
          setIds={setIds}
        />
      </div>
    </div>
  );
}

export default Conditions;
