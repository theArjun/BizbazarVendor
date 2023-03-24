import React from "react";
import { Input, Select, Table } from "antd";
import useWindowSize from "../../../../../../utils/Hooks/useWindowSize";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import EditConditionsModal from "./EditConditionsModal";
const RatesTable = ({
  shippingTimeRates,
  destinations,
  setShippingTimeRates,
}) => {
  const windowSize = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const columns = [
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Shipping time",
      dataIndex: "delivery_time",
      key: "delivery_time",
      render: (text) => (
        <div>
          <Input value={text} />
        </div>
      ),
    },
    {
      title: "Base rate",
      dataIndex: "base_rate",
      key: "base_rate",
      render: (text) => (
        <div>
          <Input value={text} />
        </div>
      ),
    },
    {
      title: "Price condition",
      children: [
        {
          title: "From(रु)",
          dataIndex: "price_condition",
          key: "from",
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
          render: (text) => <div></div>,
        },
        {
          title: "",
          dataIndex: "rate_value",
          key: "rate_value",
          render: (text, row, i) => (
            <a
              onClick={() => {
                setModalData({
                  rate_value: "C",
                  index: i,
                  destination: row?.destination,
                  condition: "Price condition",
                });
                setModalOpen(true);
              }}
            >
              <AiFillEye />
            </a>
          ),
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
          render: (text) => <div></div>,
        },
        {
          title: "",
          dataIndex: "rate_value",
          key: "rate_value",
          render: (text, row, i) => (
            <a
              onClick={() => {
                setModalData({
                  rate_value: "W",
                  index: i,
                  destination: row?.destination,
                  condition: "Weight condition",
                });
                setModalOpen(true);
              }}
            >
              <AiFillEye />
            </a>
          ),
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
          render: (text) => <div></div>,
        },
        {
          title: "",
          dataIndex: "rate_value",
          key: "rate_value",
          render: (text, row, i) => (
            <a
              onClick={() => {
                setModalData({
                  rate_value: "I",
                  index: i,
                  destination: row?.destination,
                  condition: "Item condition",
                });
                setModalOpen(true);
              }}
            >
              <AiFillEye />
            </a>
          ),
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
          x: 1800,
        }}
      />
      <EditConditionsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalData={modalData}
        setShippingTimeRates={setShippingTimeRates}
        shippingTimeRates={shippingTimeRates}
      />
    </div>
  );
};

export default RatesTable;
