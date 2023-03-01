import React, { useState, useEffect } from "react";
import styles from "./RecentOrders.module.css";
import cx from "classnames";
import { Dropdown, Menu, Table } from "antd";
import { apicall } from "../../../utils/apicall/apicall";
import { Tag } from "antd";
import OrderStatusModal from "../../../component/OrderStatusModal/OrderStatusModal";
import { useNavigate } from "react-router-dom";

function RecentOrders({ order, status, statusModalOpen, setStatusModalOpen }) {
  const [activeTab, setActiveTab] = useState("");
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
        <Tag color={statusOfRow?.params?.color}>{statusOfRow?.description}</Tag>
      </Dropdown>
    );
  };

  const columns = [
    {
      title: "Order Id",
      dataIndex: "order_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
        >
          #{text}
        </div>
      ),
      width: 140,
    },
    {
      title: "User name",
      dataIndex: "firstname",
      render: (text, dat) => (
        <div>
          {text} {dat.lastname}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, obj) => getStatusTag(text, obj.order_id),
      width: 100,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Date And Time",
      dataIndex: "timestamp",
      render: (text) => getTimeAndDate(text),
    },

    {
      title: "Total",
      dataIndex: "total",
      render: (text) => <div>रु{text}</div>,
      width: 100,
    },
  ];

  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp) * 1000);
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

  const fiterData = (order) => {
    if (activeTab === "") {
      return order;
    }
    const filteredData = order.filter((dat, i) => dat.status === activeTab);

    return filteredData;
  };

  return (
    <div className={styles.container}>
      <div className="heading-tab">Recent Orders</div>
      <div className={styles.mt} />

      <div className={styles.tabHeadingContainer}>
        <div
          className={cx(styles.tab, activeTab === "" ? styles.activeTab : null)}
          onClick={() => setActiveTab("")}
        >
          All
        </div>

        {status.map((dat, i) => (
          <div
            className={cx(
              styles.tab,
              activeTab === dat.status ? styles.activeTab : null
            )}
            key={i}
            onClick={() => setActiveTab(dat.status)}
          >
            {dat.description}
          </div>
        ))}
      </div>
      <div className={styles.mt} />
      <div className={styles.tableWrapper}>
        <Table
          dataSource={fiterData(order)}
          columns={columns}
          rowKey="order_id"
          pagination={false}
          scroll={{
            y: 240,
            x: 800,
          }}
        />
      </div>
      <OrderStatusModal
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
}

export default RecentOrders;
