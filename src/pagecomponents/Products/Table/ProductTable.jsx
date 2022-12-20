import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space, Table, Dropdown, Image, Skeleton } from "antd";
import styles from "./Table.module.css";
import { DownOutlined } from "@ant-design/icons";
import { apicall } from "../../../utils/apicall/apicall";
import { AiFillDelete, AiFillEdit, AiFillSetting } from "react-icons/ai";
import {
  handleEditData,
  loadTableData,
  setSelectedProductId,
} from "../../../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
const ProductTable = ({ setPage, loading, handleScroll, setSortBy }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.products);
  const [productId, setProductId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  useEffect(() => {
    document
      .querySelector("#product > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#product > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // Delete data
  const deleteProduct = async (id) => {
    // perform api call to retrieve data
    if (id) {
      var result = await apicall({
        method: "delete",
        url: `products/${id}`,
      });
      location.reload();
    }
  };

  // Set id
  const setSelectedRow = async (id, method) => {
    setProductId(id);
    window.localStorage.setItem("productRowId", JSON.stringify(id));
    var result = await apicall({
      url: `products/${id}`,
    });
    dispatch(handleEditData(result.data));
    if (method === "detail") {
      navigate("Edit Product");
    }
  };

  //UpdateProduct status
  const updateProductStatus = async (id, status) => {
    console.log(productId);
    const timeOutId = setTimeout(async () => {
      const result = await apicall({
        method: "put",
        data: {
          status,
        },
        url: `products/${id}`,
      });
      if (result?.statusText == "OK") {
        const allData = await apicall({
          url: `products/`,
        });
        // console.log(allData)|
        await dispatch(loadTableData(allData.data.products));
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  };

  //  set Status of product
  const changeProductStatus = (status) => {
    switch (status) {
      case "H":
        return "Hidden";
      case "A":
        return "Active";
      case "D":
        return "Disabled";
    }
  };

  //  console.log(data)
  const statusItems = [
    {
      key: "1",
      label: (
        <div onClick={() => updateProductStatus(productId, "A")}>Active</div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => updateProductStatus(productId, "D")}>Disabled</div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => updateProductStatus(productId, "H")}>Hidden</div>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          href="#"
          onClick={() => navigate("Edit Product")}
        >
          Edit <AiFillEdit />
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          href="#"
          className={styles.action_items}
          onClick={() => deleteProduct(productId)}
        >
          Delete
          <AiFillDelete />
        </a>
      ),
    },
  ];
  const columns = [
    {
      title: "Name/Code",
      dataIndex: ["product_id", "product", "product_code", "main_pair"],
      data: "data",
      key: "product",
      render: (text, row) => (
        <div className={styles.product_info}>
          <Image
            width={70}
            src={!row["main_pair"] ? "" : row["main_pair"].detailed.image_path}
            alt={""}
          />
          <div className={styles.product_name}>
            <a
              href="#"
              onClick={() => setSelectedRow(row["product_id"], "detail")}
            >
              {" "}
              <strong>{row["product"]}</strong>
            </a>
            <small>{row["product_code"]}</small>
          </div>
        </div>
      ),
      sorter: (a, b) => {},
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => {},
      render: (price) => <p>{parseFloat(price).toFixed(2)}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => {},
    },
    {
      title: "Action",
      key: "action",
      dataIndex: ["product_id"],
      render: (id) => (
        <div
          className={styles.product_action}
          onClick={() => setSelectedRow(id)}
        >
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
            trigger={["click"]}
          >
            <AiFillSetting size={20} className={styles.icons} />
          </Dropdown>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: ["status", "product_id"],
      defaultFilteredValue: "Requires Approval",
      render: (text, row) => (
        <Dropdown menu={{ items: statusItems }}>
          <Space onMouseOver={() => setProductId(row["product_id"])}>
            {changeProductStatus(row["status"])}

            <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        product_id: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  function onChange(pagination, filters, sorter, extra) {
    setPage(1);
    setSortBy(sorter);
  }

  return (
    <div>
      <Table
        id="product"
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        onChange={onChange}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ProductTable;
