import React, { useState, useRef, useEffect } from "react";
import styles from "./AddModal.module.css";
import { Modal, Input, Image, Checkbox, Table, InputNumber } from "antd";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import { AiFillDelete } from "react-icons/ai";
const AddModal = ({ modalOpen, setModalOpen, condition_data, ids, setIds }) => {
  const [productList, setProductList] = useState([]);
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
  useEffect(() => {
    let only_ids = productList.reduce((updater, current) => {
      updater = updater + "," + current.id;
      return updater;
    }, "");
    setIds(only_ids.slice(1));
  }, [productList]);
  useEffect(() => {
    if (!ids) {
      setProductList([]);
    }
  }, [ids]);

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
      temp = temp.filter((dat, i) => dat.id != object.id);
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
    const array = productList.map((dattum, index) => dattum.id);
    if (array.includes(dat.id)) {
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
            <h4>{row?.name}</h4>
            <p>{row?.code}</p>
          </div>
        </>
      ),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
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
      render: (a, row, i) => (
        <a
          onClick={() => {
            let remainingProducts = productList?.filter(
              (item, index) => index !== i
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
      onOk={() => setModalOpen(false)}
      className={styles.variation_modal}
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
              placeholder="Click here to select"
              type="text"
              onFocus={() => setSearch(" ")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.length > 0 && (
              <div className={styles.absolute}>
                {condition_data?.map((dat, i) => (
                  <div key={i} className={styles.tableRow}>
                    <Checkbox
                      checked={getChecked(productList, dat)}
                      className={styles.checkbox}
                      onChange={(e) => handleCheck(e, dat)}
                    />

                    <div style={{ marginLeft: "10px" }}>
                      <div>{dat.name}</div>
                      <div>{dat.code}</div>
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
            rowKey={"id"}
            dataSource={productList}
            columns={columns}
            pagination={false}
            scroll={{
              y: windowSize.height > 670 ? 250 : 200,
              x: 800,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
