import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { Breadcrumb, Result, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import Spinner from '../../../component/Spinner/Spinner'
import { useSelector } from "react-redux";
import { useGetProductById, useGetProductFeatures, useGetProductReviews, useGetSeoPath } from "../../../apis/ProductApi";
import { useGetCategories } from "../../../apis/CategoryApi";
import cx from "classnames";
import { apicall } from "../../../utils/apicall/apicall";
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
const tabs = [
  "General",
  "Shipping properties",
  "Options",
  "Features",
  "Variations",
  "SEO",
  "Quantity discounts",
  "Product bundles",
  "Reviews"
];
const  INITIAL_PRODUCT_STATE={
  image_pairs:{}
}
const Edit = () => {
  const param=useParams('id')
  const {isLoading:editLoading, data:editData, error:editError, status}=useGetProductById(param.id)
  const {isLoading:categoryLoading, data:categoryData}=useGetCategories()
  const {isLoading:seoLoading, data:seoData}=useGetSeoPath(param.id)
  const {isLoading:reviewLoading, data:reviewData}=useGetProductReviews(param.id)
  const {isLoading:featureLoading, data:featureData}=useGetProductFeatures(param.id)
  const [active, setActive] = useState("General");
  const [pageStatus, setPageStatus] = useState("");
  const [data, setData] = useState(INITIAL_PRODUCT_STATE);
  const [variantFeatures, setVariantFeatures] = useState("");
  const [variationData, setVariationData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Promise.all([
      getFeatures(param.id),
      // getEditData(param.id),
      getFeatureVariants(param.id),
      getSeoPath(param.id),
      getParticularReview(param.id)
    ]);
  };
  // get  specific product data 
  const getProductDetail=()=>{
    if(editData===404){
      setPageStatus(editData)
    }
    return editData?.data
  }
  // get Categories 
  const getCategories=()=>{
    return categoryData?.data?.categories
  }
  // get Selected Feature
  const getSelectedFeature=()=>{
    return editData?.data?.product_features
  }
  useEffect(() => {
    if (editData?.data) {
      if (editData?.data?.variation_group_id) {
        getProductVariationGroup(editData?.data?.variation_group_id);
      } else {
        setVariationData([]);
      }
    }
  }, [editData?.data]);
  // get variation group
  const getProductVariationGroup = async (id) => {
    setLoading(true);
    let result = await apicall({
      url: `product_variations_groups/${id}/product_variations`,
    });
    if (result.data) {
      setVariationData(
        result.data?.products?.map((el, i) => ({
          ...el,
          key: i,
        }))
      );
      setLoading(false);
    }
    setLoading(false);
  };

  // Lets get Feature variants
  const getFeatureVariants = async (id) => {
    setLoading(true);
    let result = await apicall({
      url: `products/${id}/ProductVariation`,
    });
    if (result.data) {
      setLoading(false);
      setVariantFeatures(result?.data?.features);
    } else {
      setVariantFeatures([]);
      setLoading(false);
    }
  };
  // Lets get features from API
  const getFeatures = () => {
    if(featureData?.data){
      return featureData?.data?.features
    }
    return;
  };

  // get SEO path 
  const getSeoPath= ()=>{
    if(seoData){
      return seoData?.data?.prefix;
    }
    return;
  }
  // get particular review
  const getParticularReview= ()=>{
    if(reviewData?.data){
      return Object.values(reviewData?.data?.reviews).map((el,i)=>({...el, key:i}))
    }
    return;
  }
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return <EditShipping data={getProductDetail()} setLoading={setLoading} />;
      case tabs[2]:
        return <EditOptions />;
      case tabs[3]:
        return (
          <EditFeatures
            features={getFeatures()}
            selected_features={getSelectedFeature()}
            editID={param.id}
            getData={getData}
          />
        )
      case tabs[4]:
        return variantFeatures && variationData ? (
          <EditVariations
            data={getProductDetail()}
            variations={variantFeatures}
            setVariationData={setVariationData}
            variationData={variationData}
            editID={param.id}
            loading={loading}
            setLoading={setLoading}
            getData={getData}
          />
        ) : (
          ''
        );
      case tabs[5]:
        return <EditSeo data={getProductDetail()} seoPath={getSeoPath()} />;
      case tabs[6]:
        return data ? (
          <EditQuantityDiscount
            loading={loading}
            setLoading={setLoading}
            getData={getData}
            id={param.id}
            price_data={getProductDetail()}
          />
        ) : (
          ""
        );
      case tabs[7]:
        return <div>Product bundles</div>;
      case tabs[8]:
        return <ParticularReview reviews={getParticularReview()}/>
      default:
        return (
          <EditGeneral
            editData={getProductDetail()}
            categories={getCategories()}
            getData={getProductDetail}
            key={editData}
          />
        )
    }
  };
  if(pageStatus){
    return(<Result
    status="404"
              title="404"
              subTitle="Sorry, Requested product does not found !"
              extra={<a href="/">Back Home</a>}
    />)
  }
  if(categoryLoading || editLoading || reviewLoading || seoLoading || featureLoading){
    return (
      <Spinner/>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Products</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Products</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
          </Breadcrumb>
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
