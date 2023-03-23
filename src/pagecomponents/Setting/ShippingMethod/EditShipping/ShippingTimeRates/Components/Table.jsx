import React from "react";
import { Table } from "antd";
import useWindowSize from "../../../../../../utils/Hooks/useWindowSize";
const RatesTable = ({ shippingTimeRates, destinations }) => {
  const windowSize = useWindowSize();

  const getDestinationName = (id) => {
    let name = destinations?.filter((el, i) => el?.value == id);
    return name[0]?.label;
  };
  const columns = [
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      width: 150,
      render: (id) => getDestinationName(id),
    },
    {
      title: "Shipping time",
      dataIndex: "shipping_time",
      key: "shipping_time",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Price condition",
      children: [
        {
          title: "From(रु)",
          dataIndex: "price_condition",
          key: "from",
          render: (text) => <div>{text?.from}</div>,
        },
        {
          title: "To(रु)",
          dataIndex: "price_condition",
          key: "from",
          render: (text) => <div>{text?.to}</div>,
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "price_condition",
          key: "surcharge",
          render: (text) => <div>{text?.surcharge}</div>,
        },
      ],
    },
    {
      title: "Weight condition",
      children: [
        {
          title: "From(Kg)",
          dataIndex: "weight_condition",
          key: "from",
          render: (text) => <div>{text?.from}</div>,
        },
        {
          title: "To(Kg)",
          dataIndex: "weight_condition",
          key: "from",
          render: (text) => <div>{text?.to}</div>,
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "weight_condition",
          key: "surcharge",
          render: (text) => <div>{text?.surcharge}</div>,
        },
      ],
    },
    {
      title: "Items condition",
      children: [
        {
          title: "From(item)",
          dataIndex: "items_condition",
          key: "from",
          render: (text) => <div>{text?.from}</div>,
        },
        {
          title: "To(item)",
          dataIndex: "items_condition",
          key: "from",
          render: (text) => <div>{text?.to}</div>,
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "items_condition",
          key: "surcharge",
          render: (text) => <div>{text?.surcharge}</div>,
        },
      ],
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        id="product"
        columns={columns}
        dataSource={shippingTimeRates.map((el, i) => ({ ...el, key: i })) || []}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1500,
        }}
      />
    </div>
  );
};

export default RatesTable;
