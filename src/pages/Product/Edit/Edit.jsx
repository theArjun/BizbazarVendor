import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { Breadcrumb, Result, Skeleton } from "antd";
import { useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import cx from "classnames";
import { apicall } from "../../../utils/apicall/apicall";
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
const Edit = () => {
  const categories = useSelector((state) => state.product.categories);
  const [active, setActive] = useState("General");
  const [features, setFeatures] = useState("");
  const [pageStatus, setPageStatus] = useState("");
  const [data, setData] = useState("");
  const [variantFeatures, setVariantFeatures] = useState("");
  const [variationData, setVariationData] = useState("");
  const [reviews, setReviews]=useState([])
  const [seoPath, setSeoPath] = useState("");
  const [loading, setLoading] = useState(false);
  const param=useParams('id')
  useEffect(() => {
    getData();
  }, []);
  // lets get all the required data  from api concurrently using Promise
  const getData = async () => {
    await Promise.all([
      getFeatures(param.id),
      getEditData(param.id),
      getFeatureVariants(param.id),
      getSeoPath(param.id),
      getParticularReview(param.id)
    ]);
  };
  // Get all edit data
  const getEditData = async (id) => {
    setLoading(true);
    const result = await apicall({
      url: `products/${id}`,
    });
    if (result.data) {
      setData({ ...result?.data });
      setLoading(false);
    }
    if(result===404){
      setPageStatus(result)
    }
    setLoading(false)
    
  };
  useEffect(() => {
    if (data) {
      if (data.variation_group_id) {
        getProductVariationGroup(data?.variation_group_id);
      } else {
        setVariationData([]);
      }
    }
  }, [data]);

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
      console.log(result.data)
      setLoading(false);
      setVariantFeatures(result?.data?.features);
    } else {
      setVariantFeatures([]);
      setLoading(false);
    }
  };
  // Lets get features from API
  const getFeatures = async (id) => {
    setLoading(true);
    //call api to retrieve categories
    const result = await apicall({
      url: `products/${id}/ProductFeature`,
    });
    if (result.data) {
      setFeatures(result.data);
    } else {
      setFeatures("");
    }
  };

  // get SEO path 
  const getSeoPath= async(product_id)=>{
    let result= await apicall({
      url:`products/${product_id}/ProductSeo`,

    })

    if(result?.data){
      setSeoPath(result.data?.prefix)
    }
  }
  // get particular review
  const getParticularReview= async (id)=>{
    setLoading(true)
      let result= await apicall({
        url:`ProductReview?product_id=${id}`
      })
      if(result?.data){
        setReviews(Object.values(result.data.reviews).map((el,i)=>({...el, key:i})))
        setLoading(false)
      }
      setLoading(false)
  }
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return data ? <EditShipping data={data} /> : "";
      case tabs[2]:
        return <EditOptions />;
      case tabs[3]:
        return data && features ? (
          <EditFeatures
            features={features.features}
            selected_features={data.product_features}
            editID={param.id}
            getData={getData}
          />
        ) : (
          ""
        );
      case tabs[4]:
        return variantFeatures && variationData ? (
          <EditVariations
            data={data}
            variations={variantFeatures}
            setVariationData={setVariationData}
            variationData={variationData}
            editID={param.id}
            loading={loading}
            setLoading={setLoading}
            getData={getData}
          />
        ) : (
          <Skeleton active />
        );
      case tabs[5]:
        return data ? <EditSeo data={data} seoPath={seoPath} /> : "";
      case tabs[6]:
        return data ? (
          <EditQuantityDiscount
            loading={loading}
            setLoading={setLoading}
            getData={getData}
            id={data.product_id}
            price_data={data}
          />
        ) : (
          ""
        );
      case tabs[7]:
        return <div>Product bundles</div>;
      case tabs[8]:
        return <ParticularReview reviews={reviews} loading={loading}/>
      default:
        return categories && data ? (
          <EditGeneral
            editData={data}
            loading={loading}
            setLoading={setLoading}
            categories={categories}
            getData={getData}
          />
        ) : (
          <Skeleton active />
        );
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
