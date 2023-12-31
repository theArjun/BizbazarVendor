import React, { useMemo } from "react";
import styles from "./ProductsOnModeration.module.css";
import { ProductSearch, ProductTable } from "../..";
import { useGetProducts } from "../../../apis/ProductApi";
import { useEffect } from "react";
import { useState } from "react";
import useDebounce from "../../../utils/Hooks/useDebounce";
import { useGetCategories } from "../../../apis/CategoryApi";

const INITIAL_PARAMS = {
  product_name: "",
  price_from: "",
  price_to: "",
  category: "",
  status: "R",
  sort_order: "",
  sort_by: "",
};
const ProductsOnModeration = () => {
  const [products, setProducts] = useState([]);
  const [bottom, setBottom] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortColum, setSortingColum] = useState("");
  const [params, setParams] = useState(INITIAL_PARAMS);
  const { data: categories, isLoading: categoryLoading } = useGetCategories();
  const {
    data: productData,
    isLoading: productLoading,
    isFetchingNextPage: nextLoading,
    fetchNextPage,
  } = useGetProducts(params);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  //  for getting categories
  let getCategories = useMemo(() => {
    if (categories?.data) {
      return categories?.data?.categories;
    }
    return [];
  }, [categories]);
  //let set products
  useEffect(() => {
    let temp = [];
    productData?.pages?.map((el) => {
      el?.data?.products?.map((item) => {
        temp.push(item);
      });
    });
    setProducts(temp || []);
  }, [productData]);
  // for sorting parameter
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
    <div className={styles.container}>
      <div className={styles.heading}>
        <div>Products on moderation</div>
      </div>
      <ProductSearch
        params={params}
        hasStatus={true}
        categories={getCategories}
        setParams={setParams}
      />
      <ProductTable
        handleScroll={handleScroll}
        products={products}
        setSortBy={setSortBy}
        sortColum={sortColum}
        setSortingColum={setSortingColum}
        loading={productLoading || nextLoading || categoryLoading}
      />
    </div>
  );
};

export default ProductsOnModeration;
