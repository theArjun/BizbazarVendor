import React, { useState } from "react";
import styles from "./QuantityDiscount.module.css";
import { Form, Card, Input, Select, Button, Table } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateDiscounts } from "../../../../apis/ProductApi";
import { apicall } from "../../../../utils/apicall/apicall";
import Spinner from "../../../../component/Spinner/Spinner";
const userGroup = {
  0: "All",
  1: "Guest",
  2: "Registered user",
};
const QuantityDiscounts = ({
  id,
  price_data,
  loading,
  setLoading,
  getData,
}) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("A");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteDiscount, setDeleteDiscount] = useState([]);
  const {isLoading:discountLoading, mutate:discountMutate}=useUpdateDiscounts()
  const queryClient=useQueryClient();
  const windowSize = useWindowSize();
  let discounts = price_data?.prices;
  const onFinish = (values) => {
    let temp =
      type == "A"
        ? { ...values, price: values.value }
        : {
            ...values,
            percentage_discount: values.value,
            price: price_data?.price,
          };
    let req_data = {
      prices: price_data?.prices
        .map((item) =>
          item.percentage_discount == "0"
            ? { ...item }
            : { ...item, price: price_data?.price }
        )
        .concat(temp),
    };
    updateDiscount(id, req_data);
  };
  useEffect(() => {
    const result = Object.values(price_data?.prices).map((item, i) => ({
      ...item,
      key: i,
      type: item.percentage_discount == "0" ? "Absolute" : "Percentage",
      user_group: userGroup[item.usergroup_id],
    }));
    setData(result);
    setDeleteDiscount(price_data?.prices);
  }, [price_data]);

  // Update Quantity discount
  const updateDiscount = (id, values) => {
    discountMutate({data:values, id:id},{
      onSuccess:(res)=>{
        queryClient.invalidateQueries(['single_product',id])
        setSelectedRowKeys([]);
      },
      onError:(error)=> console.log('Something went wrong,', error)
    })
  };
  const onValueChange = (a) => {
    // console.log(values)
    if (a.price_type) {
      setType(a.price_type);
    }
  };
  // setDelete Discount
  const handleDeleteDiscounts = (indexes) => {
    let temp = [...discounts];
    let test = temp.filter((item, i) => !indexes.includes(i));
    setDeleteDiscount({
      prices: test.map((item) =>
        item.percentage_discount == "0"
          ? { ...item }
          : { ...item, price: price_data?.price }
      ),
    });
  };
  const onSelectChange = (newSelectedRowKeys) => {
    //  console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    handleDeleteDiscounts(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.key === 0,
      // Column configuration not to be checked
      name: record.lower_limit,
    }),
  };
  const hasSelected = selectedRowKeys.length > 0;
  const columns = [
    {
      title: "Quantity",
      dataIndex: "lower_limit",
      key: "product",
    },
    {
      title: "Value",
      dataIndex: "price",
      key: "price",
      render: (text, row) => (
        <div>
          {row?.percentage_discount == "0"
            ? parseFloat(row.price).toFixed(2)
            : row.percentage_discount + "%"}
        </div>
      ),
    },
    {
      title: "Discounted amount/item",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{parseFloat(text).toFixed(2)}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "amount",
    },
    {
      title: "User Group",
      key: "action",
      dataIndex: "user_group",
    },
  ];
  if(discountLoading){
    return <Spinner/>
  }
  return (
    <div className={styles.quantity_discount}>
      <Card>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            price_type: "A",
            usergroup_id: "0",
          }}
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={onValueChange}
        >
          <div className={styles.discount_container}>
            <div className={styles.discount_container_left}>
              <Form.Item
                label="Quantity"
                name="lower_limit"
                style={{ width: "80px" }}
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Value"
                name="value"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Type"
                name="price_type"
                style={{ width: "200px" }}
              >
                <Select
                  showArrow
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "A", label: "Absolute(रु)" },
                    { value: "P", label: "Percent(%)" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="User group"
                name="usergroup_id"
                style={{ width: "200px" }}
              >
                <Select
                  showArrow
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "0", label: "All" },
                    { value: "1", label: "Guest" },
                    { value: "2", label: "Registered user" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className={styles.discount_container_right}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Card>
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Button
          type="primary"
          disabled={!hasSelected}
          loading={loading}
          onClick={() => updateDiscount(id, deleteDiscount)}
        >
          Delete
        </Button>
      </div>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};
export default QuantityDiscounts;
