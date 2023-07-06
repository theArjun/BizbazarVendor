import { Input, Image, Checkbox, Table, Spin } from "antd";

import React, { useState, useRef, useEffect } from "react";
import useDebounce from "../../../../../../utils/Hooks/useDebounce";
import styles from "./Products.module.css";
import "./index.css";
import { InputNumber } from "antd";
import { useGetProducts } from "../../../../../../apis/ProductApi";
import { useMemo } from "react";
const INITIAL_PARAM = {
  product_name: "",
};
function Products({ productList, setProductList }) {
  const [params, setParams] = useState(INITIAL_PARAM);
  const [bottom, setBottom] = useState(false);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const ref = useRef();
  const {
    data: productData,
    isLoading: productLoading,
    isFetchingNextPage: nextLoading,
    fetchNextPage,
  } = useGetProducts(params);
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearch("");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  useEffect(() => {
    document
      .querySelector("#productList")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#productList")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  const getProductsData = useMemo(() => {
    let temp = [];
    productData?.pages?.map((el) => {
      temp = [...temp, ...el?.data?.products];
    });
    return temp || [];
  }, [productData]);
  // Setting name of product
  useDebounce(
    () => {
      setParams({ ...params, product_name: name });
    },
    500,
    [name]
  );
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
  const handleCheck = (e, object) => {
    if (e.target.checked) {
      setProductList([
        ...productList,
        {
          ...object,
          quantity: 1,
          discountedPrice: 0,
          value: 0,
          discount: "Rs",
        },
      ]);
    }
    if (!e.target.checked) {
      let temp = [...productList];
      temp = temp.filter((dat, i) => dat.product_id != object.product_id);
      setProductList(temp);
    }
  };

  const removeFromList = (object) => {
    let temp = [...productList];
    temp = temp.filter((dat, i) => dat.product_id != object.product_id);
    setProductList(temp);
  };

  const getChecked = (productList, dat) => {
    const array = productList.map((dattum, index) => dattum.product_id);
    if (array.includes(dat.product_id)) {
      return true;
    }
    return false;
  };

  const calculateDiscountedPrice = (object) => {
    if (object.discount === "Rs") {
      return object.price * object.quantity - object.value;
    }
    if (object.discount === "%") {
      return (
        object.price * object.quantity -
        object.price * object.quantity * object.value * 0.01
      );
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",

      render: (text, dat) => (
        <div style={{ display: "flex" }}>
          {" "}
          <Image
            width={50}
            src={dat?.main_pair?.detailed?.image_path}
            fallback="/image_not_found.png"
          />
          <div style={{ marginLeft: "10px" }}>
            <div>{dat.product}</div>
            <div>{dat.product_code}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, dat, i) => (
        <InputNumber
          min={1}
          defaultValue={3}
          style={{ width: "50px" }}
          type={"number"}
          value={text}
          onChange={(value) => {
            let temp = productList;
            temp[i].quantity = value;
            setProductList(temp);
            setLoad((dat) => !dat);
          }}
        />
      ),
      width: 10,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, dat) => <>Rs {parseInt(text)}</>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (text, dat, i) => (
        <>
          <select
            value={dat.discount}
            onChange={(e) => {
              let temp = productList;
              temp[i].discount = e.target.value;
              setLoad((dat) => !dat);
              setProductList(temp);
            }}
          >
            <option value={"Rs"}>Rs</option>
            <option value={"%"}>%</option>
          </select>{" "}
        </>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (text, dat, i) => (
        <div>
          <InputNumber
            min={1}
            defaultValue={3}
            style={{ width: "100px" }}
            type={"number"}
            value={text}
            onChange={(value) => {
              let temp = productList;
              temp[i].value = value;
              setProductList(temp);
              setLoad((dat) => !dat);
            }}
          />
        </div>
      ),
    },
    {
      title: "Discounted Price",
      key: "product_id",
      dataIndex: "discountedPrice",
      render: (text, dat) => <>Rs {calculateDiscountedPrice(dat)}</>,
    },
    {
      title: "Total",
      key: "product_id",
      dataIndex: "discountedPrice",
      render: (text, dat) => <>Rs {dat.price * dat.quantity}</>,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text, dat) => (
        <div className={styles.remove} onClick={() => removeFromList(dat)}>
          Remove
        </div>
      ),
    },
  ];

  const getTotalForAll = () => {
    return productList.reduce(
      (init, dat) => init + parseInt(dat.price) * parseInt(dat.quantity),
      0
    );
  };

  const getPriceForAll = () => {
    return productList.reduce(
      (init, dat) => init + calculateDiscountedPrice(dat),
      0
    );
  };

  return (
    <div>
      <h2>Bundle products</h2>
      <div ref={ref} className={styles.relative}>
        <Input
          placeholder="Search Product"
          type="text"
          onFocus={() => setSearch(" ")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {search.length > 0 && (
          <div className={styles.absolute} id="productList">
            {getProductsData?.map((dat, i) => (
              <div key={i} className={styles.tableRow}>
                <Checkbox
                  checked={getChecked(productList, dat)}
                  className={styles.checkbox}
                  onChange={(e) => handleCheck(e, dat)}
                />
                <Image
                  width={50}
                  src={dat?.main_pair?.detailed?.image_path}
                  fallback="/image_not_found.png"
                />

                <div style={{ marginLeft: "10px" }}>
                  <div>{dat.product}</div>
                  <div>{dat.product_code}</div>
                </div>
              </div>
            ))}
            {productLoading || nextLoading ? (
              <div className={styles.loadingSpinner}>
                <Spin />
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className={styles.tableContain} id="pt">
        <Table
          rowKey={"product_id"}
          dataSource={productList}
          columns={columns}
          pagination={false}
        />
      </div>
      <div>Total : {getTotalForAll()}</div>
      <div>Price For All : {getPriceForAll()}</div>
      <div>
        Shared discount : <InputNumber />
      </div>
    </div>
  );
}

export default Products;
