import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { apicall } from "../../../utils/apicall/apicall";

function ShippingMethod() {
  const [shipments, setShipments] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });
    // console.log(result.data.statuses);
    setStatus(result.data.statuses);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await apicall({
      url: "shipments",
    });
    const result1 = await apicall({
      url: "shippings",
    });
    console.log(result.data.shipments);
    console.log(result1.data.shippings);

    // setShipments(result.data.shippings);
  };

  const columns = [
    {
      title: "POS",
      dataIndex: "company_id",
      render: (text) => <>{text}</>,
    },
    {
      title: "Name",
      dataIndex: "shipping",
    },
    {
      title: "DELIVERY TIME",
      dataIndex: "delivery_time",
    },
    {
      title: "WEIGHT LIMIT (KG)",
      dataIndex: "name",

      render: (text, dat) => (
        <a>
          {dat.min_weight}-{dat.max_weight}
        </a>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={shipments}
        scroll={{
          y: 240,
          x: 1000,
        }}
      />
    </div>
  );
}

export default ShippingMethod;
