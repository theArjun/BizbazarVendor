import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apicall } from "../../utils/apicall/apicall";
import styles from "./Product.module.css";
import "./index.css";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Col, Row, Breadcrumb, Dropdown, } from "antd";
import { HiChevronDown, HiPlus } from "react-icons/hi";
import { ProductSearch, ProductTable } from "..";
import useDebounce from "../../utils/Hooks/useDebounce";
import { loadTableData } from "../../redux/features/products/productSlice";
const Products = () => {
  const data = useSelector((state) => state.product.products);
  const [sValue, setSearchValue] = useState({});
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortColum, setSortingColum] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const a = Object.values(sValue).join("");
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  useDebounce(
    () => {
      setPage(1);
      getProducts(sValue);
    },
    500,
    [a]
  );
  useEffect(() => {
    getProducts(sValue);
  }, [sortBy?.order, sortBy?.field]);
  const getUrl = (values) => {

    let newUrl = "products?is_search=Y";
    if (values?.name) {
      newUrl = newUrl + "&pname=" + values.name;
    }
    if (values?.cid) {
      newUrl = newUrl + "&cid=" + values.cid;
    }
    if (values?.status) {
      newUrl = newUrl + "&status=" + values.status;
    }
    if (values?.max_price) {
      newUrl = newUrl + "&price_to=" + values.max_price;
    }
    if (values?.min_price) {
      newUrl = newUrl + "&price_from=" + values.min_price;
    }
    if (sortBy?.order) {
      const orderType = sortBy?.order === "ascend" ? "asc" : "desc";
      newUrl = newUrl + "&sort_order=" + orderType;
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
      newUrl = newUrl + "&sort_by=" + sortType;
    }
    return newUrl + `&page=${page}&items_per_page=${20}`;
  };
  const getProducts = async (values) => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(values),
    });
    dispatch(loadTableData(result.data.products));
    setLoading(false);
  };

  const getMoreData = async (values) => {
    setLoading(true);
    const result = await apicall({
      url: getUrl(values),
    });
    if (result.data) {
      dispatch(loadTableData([...data, ...result?.data?.products]));
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (data?.length < 10) {
      return;
    }
    if (!bottom) {
      return;
    }
    setPage((p) => p + 1);
    getMoreData(sValue);
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
          rel="noopener noreferrer"
          href="/products/BulkProductAddition"
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
          target="_blank"
          rel="noopener noreferrer"
          href="/products/products/delete"
          className={styles.action_items}
        >
          Product subscriptions
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
              <Dropdown menu={{ items }} className={styles.dropdown_setting} arrow
              trigger={["click"]}>
                  <AiFillSetting className={styles.icons1} />
              </Dropdown>
              <div   className={styles.new_add_btn}
              onClick={() => navigate("Add Product")}>
              <HiPlus style={{margin:0,padding:0}} size={20}
              />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ProductSearch data={data?data:''} setSearchValue={setSearchValue} />
      <ProductTable
        handleScroll={handleScroll}
        data={data?data:''}
        page={page}
        setPage={setPage}
        setSortBy={setSortBy}
        sortColum={sortColum}
        setSortingColum={setSortingColum}
        setLoading={setLoading}
        loading={loading}
        getProducts={getProducts}
      />
    </div>
  );
};

export default Products;
