import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import { Button, Table } from "antd";
import { Tag } from "antd";
import CreateShipping from "./../CreateShipping/CreateShipping";
import EditShipping from "../EditShipping/EditShipping";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

function ShippingMethod({ shipings, setBottom }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  React.useEffect(() => {
    document
      .querySelector("#shiipmenttable > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#shiipmenttable > div > div.ant-table-body ")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };

  const columns = [
    {
      title: "Pos",
      dataIndex: "position",
    },
    {
      title: "Name",
      dataIndex: "shipping",
      render: (text) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/Setting/Shipping Methods/:id")}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Delivery Time",
      dataIndex: "delivery_time",
    },
    {
      title: "Weight Limit",
      dataIndex: "Position",
      render: (text, dat) => (
        <>
          {dat.max_weight}-{dat.min_weight}
        </>
      ),
    },
    {
      title: "User Group",
      dataIndex: "usergroup_ids",
    },
    {
      title: "Tools",
      dataIndex: "Position",
      render: (text, dat) => <div onClick={() => setOpenEdit(true)}>Edit</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, dat) => (
        <Tag color={text === "A" ? "green" : "red"}>
          {text === "A" ? "Active" : "Disable"}
        </Tag>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        id="shiipmenttable"
        dataSource={shipings}
        columns={columns}
        rowKey={"shipping_id"}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 1000,
        }}
      />
      <Button className={styles.button} onClick={() => setOpen(true)}>
        Create
      </Button>
      <CreateShipping open={open} setOpen={setOpen} />
      <EditShipping openEdit={openEdit} setOpenEdit={setOpenEdit} />
    </div>
  );
}

export default ShippingMethod;
