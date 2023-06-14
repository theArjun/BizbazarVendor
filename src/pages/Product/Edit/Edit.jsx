import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { Breadcrumb, Result, Form, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GeneralContextProvider } from "../../../ContextProvider/ContextProvider";
import Spinner from "../../../component/Spinner/Spinner";
import {
  useGetFeatureVariants,
  useGetProductById,
  useGetProductFeatures,
  useGetProductOptions,
  useGetProductReviews,
  useGetSelectedOptions,
  useGetSeoPath,
} from "../../../apis/ProductApi";
import { useGetCategories } from "../../../apis/CategoryApi";
import cx from "classnames";
import {
  EditFeatures,
  EditGeneral,
  EditOptions,
  EditQuantityDiscount,
  EditSeo,
  EditShipping,
  EditVariations,
  ParticularReview,
} from "../..";
import { useMemo } from "react";
import { AiFillEye } from "react-icons/ai";
import { config } from "../../../config/config";
const tabs = [
  "General",
  "Shipping properties",
  "Options",
  "Features",
  "Variations",
  "SEO",
  "Quantity discounts",
  "Product bundles",
  "Reviews",
];

const Edit = () => {
  const param = useParams("id");
  const [active, setActive] = useState("General");
  const {
    isLoading: editLoading,
    data: editData,
    error: editError,
    isError: isProductError,
  } = useGetProductById(param.id);
  const { isLoading: categoryLoading, data: categoryData } = useGetCategories();
  const { isLoading: seoLoading, data: seoData } = useGetSeoPath(param.id);
  const { isLoading: reviewLoading, data: reviewData } = useGetProductReviews(
    param.id
  );
  const { data: selectedOptions, isLoading: optionLoading } =
    useGetSelectedOptions(param.id);
  const { isLoading: featureLoading, data: featureData } =
    useGetProductFeatures(param.id);
  const { isLoading: featureVariantsLoading, data: featureVariantData } =
    useGetFeatureVariants(param.id);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // get  specific product data
  const getProductDetail = useMemo(() => {
    if (editData?.data) {
      return editData?.data;
    }
    return {};
  }, [editData]);
  // get Categories
  const getCategories = useMemo(() => {
    if (categoryData?.data) {
      return categoryData?.data?.categories;
    }
    return [];
  }, [categoryData]);
  // get Selected Feature

  const getSelectedFeature = useMemo(() => {
    if (editData?.data) {
      return editData?.data?.product_features;
    }
    return {};
  }, [editData]);

  // Lets get Feature variants
  const getFeatureVariants = useMemo(() => {
    if (featureVariantData?.data) {
      return featureVariantData?.data?.features;
    }
    return [];
  }, [featureVariantData]);
  // Lets get features from API
  const getFeatures = useMemo(() => {
    if (featureData?.data) {
      return featureData?.data?.features;
    }
    return [];
  }, [featureData]);
  // get Selected options
  const optionsData = useMemo(() => {
    return Object.values(selectedOptions?.data || {});
  }, [selectedOptions]);
  // get Selected options
  const optionKeys = useMemo(() => {
    return Object.keys(selectedOptions?.data || {});
  }, [selectedOptions]);
  // get SEO path
  const getSeoPath = useMemo(() => {
    if (seoData) {
      return seoData?.data?.prefix;
    }
    return "";
  }, [seoData]);
  // get particular review
  const getParticularReview = useMemo(() => {
    if (reviewData?.data) {
      return Object.values(reviewData?.data?.reviews).map((el, i) => ({
        ...el,
        key: i,
      }));
    }
    return [];
  }, [reviewData]);
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <EditShipping data={getProductDetail} />;
      case tabs[2]:
        return (
          <EditOptions
            options_data={optionsData}
            option_keys={optionKeys}
            loading={optionLoading}
          />
        );
      case tabs[3]:
        return (
          <EditFeatures
            features={getFeatures}
            selected_features={getSelectedFeature}
            editID={param.id}
          />
        );
      case tabs[4]:
        return (
          <EditVariations
            data={getProductDetail}
            variations={getFeatureVariants}
            editID={param.id}
          />
        );
      case tabs[5]:
        return <EditSeo data={getProductDetail} seoPath={getSeoPath} />;
      case tabs[6]:
        return (
          <EditQuantityDiscount id={param.id} price_data={getProductDetail} />
        );
      case tabs[7]:
        return <div>Product bundles</div>;
      case tabs[8]:
        return <ParticularReview reviews={getParticularReview} />;
      default:
        return (
          <GeneralContextProvider>
            <EditGeneral
              editData={getProductDetail}
              categories={getCategories}
              getData={getProductDetail}
              key={editData}
              form={form}
            />
          </GeneralContextProvider>
        );
    }
  };
  if (isProductError) {
    return (
      <Result
        status={editError?.response?.status}
        title={editError?.response?.status}
        subTitle={editError?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  if (
    categoryLoading ||
    editLoading ||
    reviewLoading ||
    seoLoading ||
    featureLoading ||
    featureVariantsLoading
  ) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/Products">Products</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{active}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.preview_btn}>
          <Button
            onClick={() =>
              window.open(
                `${config.BASE_URL}${getProductDetail?.seo_name}/?action=preview`
              )
            }
          >
            <AiFillEye size={20} />
          </Button>
        </div>
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

      {getContainerFromTab()}
    </div>
  );
};

export default Edit;
