import React from "react";
import { Input, Select, Table } from "antd";
import useWindowSize from "../../../../../../utils/Hooks/useWindowSize";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import EditConditionsModal from "./EditConditionsModal";
const RatesTable = ({
  shippingTimeRates,
  destinations,
  setShippingTimeRates,
  setHaveRate,
  haveRate,
}) => {
  const windowSize = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleDeleteDestination = (id) => {
    let temp = [...haveRate];
    let hasRate = temp.filter((el, i) => el?.destination_id !== id);
    setHaveRate(hasRate);
  };
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
      render: (text, row, i) => (
        <div>
          <Input
            value={text}
            onChange={(e) => {
              let temp = [...haveRate];
              temp[i].delivery_time = e.target.value;
              setHaveRate(temp);
            }}
          />
        </div>
      ),
    },
    {
      title: "Base rate",
      dataIndex: "base_rate",
      key: "base_rate",
      render: (text, row, i) => (
        <div>
          <Input
            value={text}
            onChange={(e) => {
              let temp = [...haveRate];
              temp[i].base_rate = e.target.value;
              setHaveRate(temp);
            }}
          />
        </div>
      ),
    },
    {
      title: "Price condition",
      children: [
        {
          title: "From(रु)",
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["C"] || {}).at(-1)?.range_from_value || ""}
            </div>
          ),
        },
        {
          title: "To(रु)",
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["C"] || {}).at(-1)?.range_to_value || ""}
            </div>
          ),
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "rate_value",
          key: "surcharge",
          render: (value) => (
            <div>{Object?.values(value["C"] || {}).at(-1)?.value || ""}</div>
          ),
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
              <AiFillEdit size={18} />
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
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["W"] || {}).at(-1)?.range_from_value || ""}
            </div>
          ),
        },
        {
          title: "To(Kg)",
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["W"] || {}).at(-1)?.range_to_value || ""}
            </div>
          ),
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "rate_value",
          key: "surcharge",
          render: (value) => (
            <div>{Object?.values(value["W"] || {}).at(-1)?.value || ""}</div>
          ),
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
              <AiFillEdit size={18} />
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
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["I"] || {}).at(-1)?.range_from_value || ""}
            </div>
          ),
        },
        {
          title: "To(item)",
          dataIndex: "rate_value",
          key: "from",
          render: (value) => (
            <div>
              {Object?.values(value["I"] || {}).at(-1)?.range_to_value || ""}
            </div>
          ),
        },
        {
          title: "Surcharge / Discount",
          dataIndex: "rate_value",
          key: "surcharge",
          render: (value) => (
            <div>{Object?.values(value["I"] || {}).at(-1)?.value || ""}</div>
          ),
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
              <AiFillEdit size={18} />
            </a>
          ),
        },
      ],
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "destination_id",
      fixed: "right",
      width: 100,
      render: (id) => (
        <a onClick={() => handleDeleteDestination(id)}>
          <AiFillDelete size={20} color={"red"} />
        </a>
      ),
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
        setHaveRate={setHaveRate}
        haveRate={haveRate}
      />
    </div>
  );
};

export default RatesTable;
