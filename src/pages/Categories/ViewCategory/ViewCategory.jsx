import React, { useMemo } from "react";
import styles from "./ViewCategory.module.css";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Button, Dropdown, Result } from "antd";
import { CategoryNest, SingleCategory } from "../..";
import { useNavigate } from "react-router-dom";
import {
  useGetCategoryByID,
  useGetCategoryFee,
  useGetNestedCategories,
} from "../../../apis/CategoryApi";
import Spinner from "../../../component/Spinner/Spinner";
import { config } from "../../../config/config";
import { AiFillSetting } from "react-icons/ai";
const ViewCategory = () => {
  const { id: category_id } = useParams("id");
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCategoryByID(category_id);
  const { data: feeData, isLoading: feeLoading } =
    useGetCategoryFee(category_id);
  const { data: categoriesData, isLoading: dataLoading } =
    useGetNestedCategories();
  // getting nested category data
  const categories = useMemo(() => {
    return categoriesData?.data?.categories?.storefront_0?.subcategories || [];
  }, [categoriesData]);
  // Getting category details data
  const categoryData = useMemo(() => {
    return data?.data?.category_data || {};
  }, [data]);
  // Getting Fee data using useMemo
  const category_fee = useMemo(() => {
    return feeData?.data || {};
  });
  //  function for handling print and download button click
  const handleMenuClick = (value) => {
    if (value.key === "1") {
      navigate(`/Categories/${categoryData?.category_id}/Products`);
    } else {
      window.open(
        `${config.BASE_URL}${categoryData?.seo_name}/?action=preview`,
        "_blank"
      );
    }
  };
  const items = [
    {
      label: "View products",
      key: "1",
    },
    {
      label: "Preview",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  if (isLoading || dataLoading || feeLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  return (
    <div className={styles.view_category}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Categories">Categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{category_id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.action_buttons}>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button type="primary">
              <AiFillSetting size={20} color="white" />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className={styles.single_category_main_container}>
        <CategoryNest data={categories} panelKey={category_id} />
        <SingleCategory data={categoryData} category_fee={category_fee} />
      </div>
    </div>
  );
};

export default ViewCategory;
