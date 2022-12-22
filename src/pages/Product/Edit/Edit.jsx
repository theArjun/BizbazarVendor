import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";
import { Breadcrumb } from "antd";
import { EditFeatures, EditGeneral, EditOptions, EditSeo, EditShipping } from "../..";
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
];
const Edit = () => {
  const categories=useSelector((state)=>state.product.categories);
  const editID=JSON.parse(window.localStorage.getItem("productRowId"));
  const [active, setActive] = useState("General");
  const [features, setFeatures]=useState(''); 
  const [data, setData]=useState('');
  const [loading, setLoading]=useState(false);
  useEffect(() => {
   getData();
  }, []);
  // lets get all the required data  from api concurrently using Promise 
  const getData=async()=>{
    await Promise.all([getFeatures(), getEditData(editID)])
  }
  // Get all edit data
  const getEditData= async (id)=>{
    setLoading(true)
    const result = await apicall({
      url:`products/${id}`,
    });
    if(result.data){
        setData({...result?.data})
        setLoading(false)
    }
  }
  // Lets get features from API
  const getFeatures = async () => {
    setLoading(true);
    //call api to retrieve categories
    const result = await apicall({
      url: "features",
    });
    if(result.data){
      setFeatures(result.data)

    } else {
     setFeatures('')
    }
  };
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return data?<EditShipping data={data} />:'';
      case tabs[2]:
        return <EditOptions/>;
      case tabs[3]:
        return <EditFeatures features={features} />;
      case tabs[4]:
        return <div>Variations</div>;
      case tabs[5]:
        return data?<EditSeo data={data} />:'';
      case tabs[6]:
        return <div>Quantity discounts</div>;
      case tabs[7]:
        return <div>Product bundles</div>;
      default:
        return categories && data?<EditGeneral editData={data?data:''} loading={loading} categories={categories}/>:'';
    }
  };
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
