import React from "react";
import { useState } from "react";
import styles from "./ViewProducts.module.css";
import { Link, useParams } from "react-router-dom";
import { ProductSearch, ProductTable } from "../..";
import { Breadcrumb } from "antd";
import { useGetCategoryProducts } from "../../../apis/CategoryApi";
import { useMemo } from "react";
import { useEffect } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  product_name: "",
  price_from: "",
  price_to: "",
  status: "",
  sort_order: "",
  sort_by: "",
};
const ViewProducts = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [sortBy, setSortBy] = useState("");
  const [bottom, setBottom] = useState(false);
  const { id: category_id } = useParams("id");
  const {
    data: productData,
    isLoading: productLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetCategoryProducts(category_id, params);

  // Getting category data
  const products = useMemo(() => {
    let temp = [];
    try {
      productData?.pages?.map((el) => {
        el?.data?.products?.map((item) => {
          temp.push(item);
        });
      });
      return temp;
    } catch (e) {
      console.log("Error: ", e.message);
    }
  }, [productData]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // for sorting params
  useEffect(() => {
    let param = { ...params };
    if (sortBy?.order) {
      const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
      param.sort_order = orderType;
      let sortType = "";
      switch (sortBy?.field) {
        case "price":
          sortType = "price";
          break;
        case "amount":
          sortType = "amount";
          break;
      }
      if (sortBy?.field[1] === "product") {
        sortType = "product";
      }
      param.sort_by = sortType;
    }
    setParams(param);
  }, [sortBy]);
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
  return (
    <div className={styles.view_category_products}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Categories">Categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {" "}
            <Link to={`/Categories/${category_id}`}>{category_id}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.view_category_products_container}>
        <div className={styles.view_category_products_container_body}>
          <ProductSearch
            params={params}
            setParams={setParams}
            category={true}
          />
          <ProductTable
            products={products}
            handleScroll={handleScroll}
            setSortBy={setSortBy}
            loading={productLoading || isFetchingNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
