import { Input, Image, Checkbox, Table } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { apicall } from "../../../../../../utils/apicall/apicall";
import useDebounce from "../../../../../../utils/Hooks/useDebounce";
import styles from "./Products.module.css";
import "./index.css";
import { InputNumber } from "antd";

function Products() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [productList, setProductList] = useState([]);

  const ref = useRef();

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
  });

  const getUrl = (search) => {
    return (
      "products?is_search=Y" +
      "&pname=" +
      search +
      `&page=${1}&items_per_page=${50}`
    );
  };

  const getProducts = async () => {
    const result = await apicall({
      url: getUrl(),
    });
    setData(result.data.products);
  };

  useDebounce(
    () => {
      getProducts();
    },
    1200,
    [search]
  );

  const handleCheck = (e, object) => {
    if (e.target.checked) {
      setProductList([
        ...productList,
        {
          ...object,
          quantity: 1,
          discountedPrice: 0,
          value: object.amount,
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

  const columns = [
    {
      title: "Product",
      dataIndex: "name",

      render: (text, dat) => (
        <div style={{ display: "flex" }}>
          {" "}
          <Image width={50} src={dat?.main_pair?.detailed?.image_path} />
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
      render: (text) => (
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          style={{ width: "50px" }}
          type={"number"}
          value={text}
        />
      ),
      width: 10,
    },
    {
      title: "Price",
      dataIndex: "amount",
    },
    {
      title: "Discount",
      dataIndex: "discountedPrice",
      render: (text, dat) => <>rs</>,
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (text, dat) => <div>{text}</div>,
    },
    {
      title: "Discounted Price",
      dataIndex: "discountedPrice",
      render: (text, dat) => <>Rs {text}</>,
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

  return (
    <div>
      <h2>Bundle products</h2>
      <div ref={ref} className={styles.relative}>
        <Input
          placeholder="Search Product"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 1 && (
          <div className={styles.absolute}>
            {data?.map((dat, i) => (
              <div key={i} className={styles.tableRow}>
                <Checkbox
                  checked={getChecked(productList, dat)}
                  className={styles.checkbox}
                  onChange={(e) => handleCheck(e, dat)}
                />
                <Image width={50} src={dat?.main_pair?.detailed?.image_path} />

                <div style={{ marginLeft: "10px" }}>
                  <div>{dat.product}</div>
                  <div>{dat.product_id}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.tableContain} id="pt">
        <Table
          dataSource={productList}
          rowKey={"product_id"}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default Products;
