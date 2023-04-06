import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import "./index.css";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Col, Row, Breadcrumb, Dropdown } from "antd";
import { HiPlus } from "react-icons/hi";
import { ProductSearch, ProductTable } from "..";
import { useGetProducts } from "../../apis/ProductApi";
const INITIAL_PARAMS = {
  product_name: "",
  price_from: "",
  price_to: "",
  category: "",
  status: "",
  sort_order: "",
  sort_by: "",
};
const Products = () => {
  const [products, setProducts] = useState([]);
  const [bottom, setBottom] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortColum, setSortingColum] = useState("");
  const navigate = useNavigate();
  const [params, setParams] = useState(INITIAL_PARAMS);
  const {
    data: productData,
    isLoading: productLoading,
    isFetchingNextPage: nextLoading,
    fetchNextPage,
  } = useGetProducts(params);
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
  useEffect(() => {
    if (!bottom) {
      return;
    }
    fetchNextPage();
  }, [bottom]);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/products/products/delete"
        >
          Global update
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => navigate("../products/BulkProductAddition")}
          className={styles.action_items}
        >
          Bulk product addition
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => navigate("../products/productsonmoderation")}
          className={styles.action_items}
        >
          Product on moderation
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/products/products/delete"
          className={styles.action_items}
        >
          Export found products
        </a>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <div className="product_header">
        <Row>
          <Col span={8}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={8} offset={8}>
            <div className={styles.productAsset}>
              <Dropdown
                menu={{ items }}
                className={styles.dropdown_setting}
                arrow
                trigger={["click"]}
              >
                <AiFillSetting className={styles.icons1} />
              </Dropdown>
              <div
                className={styles.new_add_btn}
                onClick={() => navigate("Add Product")}
              >
                <HiPlus style={{ margin: 0, padding: 0 }} size={20} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ProductSearch params={params} setParams={setParams} />
      <ProductTable
        handleScroll={handleScroll}
        products={products}
        setSortBy={setSortBy}
        sortColum={sortColum}
        setSortingColum={setSortingColum}
        loading={productLoading || nextLoading}
      />
    </div>
  );
};

export default Products;
