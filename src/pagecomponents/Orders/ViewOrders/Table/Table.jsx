import React, { useEffect, useState, useRef } from "react";
import { Table, Button } from "antd";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import { Dropdown, Menu, Space } from "antd";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import OrderStatusModal from "../../../../component/OrderStatusModal/OrderStatusModal";
import "./index.css";

const ViewOrderTable = ({
  status,
  order,
  // setPage,
  statusModalOpen,
  setStatusModalOpen,
  setSortBy,
  setOrder,
  loading,
  page1,
}) => {
  const windowSize = useWindowSize();

  const navigate = useNavigate();

  const menu = (filterStatus, objId) => (
    <Menu
      items={status
        .filter((datt, ii) => filterStatus != datt?.description)
        .map((dat, i) => ({
          key: i,
          label: (
            <div
              onClick={() => {
                setStatusModalOpen({
                  open: true,
                  data: dat,
                  orderId: objId,
                });
              }}
              target="_blank"
              style={{ color: dat?.params?.color }}
            >
              {dat.description}
            </div>
          ),
        }))}
    />
  );

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);

    return (
      <Dropdown overlay={menu(statusOfRow?.description, obj)}>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </Dropdown>
    );
  };

  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp));
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };

  const columns = [
    {
      title: "sn",
      dataIndex: "firstname",
      key: "order_id",
      render: (text, dat, i) => <div>{i + 1}</div>,
      width: 60,
    },
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "status_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
        >
          #{text}
        </div>
      ),
      width: 140,
      sorter: (a, b) => {},
    },
    {
      title: "User name",
      dataIndex: "firstname",
      key: "order_id",
      render: (text, dat) => (
        <div>
          {text} {dat.lastname}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "order_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "order_id",
      render: (text, obj) => getStatusTag(text, obj.order_id),
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "order_id",
    },
    {
      title: "Date And Time",
      dataIndex: "timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
      sorter: (a, b) => {},
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "order_id",
      render: (text) => <div>रु{text}</div>,
      width: 100,
    },
  ];

  const total = () => {
    const data = order;
    const gr = data.reduce((init, dat) => init + parseInt(dat.total), 0);
    return gr;
  };

  const grossTotal = () => {
    const data = order;
    const t = data
      .filter((datt, ii) => datt.status === "P")
      .reduce((init, dat) => init + parseInt(dat.total), 0);

    return t;
  };

  function onChange(pagination, filters, sorter, extra) {
    page1.current = 1;
    setSortBy(sorter);
    setOrder([]);
  }

  return (
    <div>
      <Table
        id="hello"
        columns={columns}
        loading={loading}
        dataSource={order}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 1000,
        }}
        onChange={onChange}
      />
      <div className={styles.gross_total}>
        <p>Gross Total: रु {grossTotal()}</p>
        <h4>
          Total Paid <span style={{ color: "green" }}>रु{total()}</span>
        </h4>
      </div>
      <OrderStatusModal
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
};

export default ViewOrderTable;
