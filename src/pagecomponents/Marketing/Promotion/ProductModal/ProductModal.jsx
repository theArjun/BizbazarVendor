import React, { useState, useRef, useEffect } from "react";
import styles from "./ProductModal.module.css";
import { Modal, Input, Image, Checkbox, Table } from "antd";
import useDebounce from "../../../../utils/Hooks/useDebounce";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { AiFillDelete } from "react-icons/ai";
const ProductModal = ({ modalOpen, setModalOpen, productData }) => {
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const ref = useRef();
  const windowSize = useWindowSize();
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
  const getProducts = async () => {
    setData(productData);
  };

  useDebounce(
    () => {
      getProducts();
    },
    100,
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
  //  set Status of product
  const getProductStatus = (status) => {
    switch (status) {
      case "H":
        return "Hidden";
      case "A":
        return "Active";
      case "D":
        return "Disabled";
      case "R":
        return "Requires Approval";
      case "X":
        return "Disapproved";
      default:
        return "Attention required";
    }
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
      title: "Name/Code",
      dataIndex: "name",
      render: (text, row) => (
        <>
          <div className={styles.product_name}>
            <h4>{row?.product}</h4>
            <p>{row?.product_code}</p>
          </div>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <div>{getProductStatus(status)}</div>,
    },
    {
      title: "Action",
      dataIndex: "",
      width: 100,
      render: (a, row) => (
        <a
          onClick={() => {
            let remainingProducts = productList?.filter(
              (item) => item?.product_id !== row?.product_id
            );
            setProductList(remainingProducts);
          }}
        >
          {<AiFillDelete size={22} color="red" />}
        </a>
      ),
    },
  ];

  return (
    <Modal
      maskClosable={false}
      title="Add products"
      centered
      open={modalOpen}
      className={styles.variation_modal}
      onOk={() => setModalOpen(false)}
      onCancel={() => {
        setProductList([]);
        setModalOpen(false);
      }}
      width={1000}
    >
      <div className={styles.tabcontain}>
        <div>
          <h2>Promotion products</h2>
          <div ref={ref} className={styles.relative}>
            <Input
              placeholder="Search Product"
              type="text"
              onFocus={() => setSearch(" ")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <div className={styles.absolute}>
                {data?.map((dat, i) => (
                  <div key={i} className={styles.tableRow}>
                    <Checkbox
                      checked={getChecked(productList, dat)}
                      className={styles.checkbox}
                      onChange={(e) => handleCheck(e, dat)}
                    />
                    <Image
                      width={50}
                      src={dat?.main_pair?.detailed?.image_path}
                    />

                    <div style={{ marginLeft: "10px" }}>
                      <div>{dat.product}</div>
                      <div>{dat.product_id}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div></div>
        <div className={styles.tableContain}>
          <Table
            rowKey={"product_id"}
            dataSource={productList}
            columns={columns}
            pagination={false}
            scroll={{
              y: windowSize.height > 670 ? 250 : 200,
              x: 700,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
