import React, { useState } from "react";
import styles from "./ShippingMethod.module.css";
import { Button, Modal, Table, Radio } from "antd";
import { Tag } from "antd";
import CreateShipping from "./../CreateShipping/CreateShipping";
import EditShipping from "../EditShipping/EditShipping";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import {
  useChangeShippingMethodStatus,
  useDeleteShippingMethod,
} from "../../../../apis/ShippingMethodApi";
function ShippingMethod({
  open,
  setOpen,
  shipings,
  setBottom,
  setUpdate,
  loading,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [status, setStatus] = useState("A");
  const [id, setId] = useState("");

  const windowSize = useWindowSize();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isLoading: deleteLoading } =
    useDeleteShippingMethod();
  const { mutate: statusMutate, isLoading: statusLoading } =
    useChangeShippingMethodStatus();
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
  // get usegroup names
  const getUserGroups = (ids) => {
    let names = ids.split(",").reduce((accumulator, currentValue) => {
      if (currentValue == 2) {
        accumulator = accumulator + ", " + "Registered";
      }
      if (currentValue == 1) {
        accumulator = accumulator + ", " + "Guest";
      }
      if (currentValue == 0) {
        accumulator = accumulator + ", " + "All";
      }
      return accumulator;
    }, "");
    return names.slice(1);
  };
  const columns = [
    {
      title: "Pos",
      dataIndex: "position",
    },
    {
      title: "Name",
      dataIndex: "shipping",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() =>
            navigate("/Setting/Shipping Methods/" + dat.shipping_id)
          }
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
        <div>
          {dat.max_weight}-{dat.min_weight}
        </div>
      ),
    },
    {
      title: "User Group",
      dataIndex: "usergroup_ids",
      render: (text) => getUserGroups(text || {}),
    },
    {
      title: "Tools",
      dataIndex: "Position",
      render: (text, dat) => (
        <div
          className={styles.icon}
          onClick={() => {
            setOpenEdit(true);
            setId(dat.shipping_id);
          }}
        >
          <AiOutlineEye />
        </div>
      ),
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

  const onSelectChange = (a) => {
    console.log();
    setSelectedRowKeys(a);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteShipments = async () => {
    Modal.warn({
      title: "Are you sure!",
      closable: true,

      onCancel: () => {
        setUpdate((dat) => !dat);
      },
      okButtonProps: {
        loading: deleteLoading,
      },
      onOk: async () => {
        let data = {
          shipping_ids: Object.assign({}, selectedRowKeys),
        };
        deleteMutate(data, {
          onSuccess: (res) => {
            queryClient.invalidateQueries("shippings");
            setUpdate((dat) => !dat);
            setSelectedRowKeys([]);
          },
        });
      },
    });
  };

  const changeStatus = async () => {
    Modal.warn({
      title: "Are you sure!",
      closable: true,

      onCancel: () => {
        setUpdate((dat) => !dat);
        setOpenStatusModal(false);
      },
      okButtonProps: {
        loading: statusLoading,
      },
      onOk: async () => {
        let data = {
          table_name: "shippings",
          status: status,
          id_name: "shipping_id",
          ids: [...selectedRowKeys],
        };
        statusMutate(data, {
          onSuccess: (res) => {
            queryClient.invalidateQueries("shippings");
            setUpdate((dat) => !dat);
            setOpenStatusModal(false);
          },
        });
      },
    });
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "right",
          marginBottom: "10px",
        }}
      >
        {selectedRowKeys.length > 0 ? (
          <>
            <Button onClick={deleteShipments}>Delete</Button>

            <Button
              style={{ margin: "0 0 0 10px" }}
              onClick={() => setOpenStatusModal(true)}
            >
              Change Status
            </Button>
          </>
        ) : null}
        <Button style={{ margin: "0 0 0 10px" }} onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>

      <Table
        id="shiipmenttable"
        loading={loading}
        rowSelection={rowSelection}
        dataSource={shipings}
        columns={columns}
        rowKey={"shipping_id"}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 400 : 300,
          x: 1000,
        }}
      />

      <CreateShipping open={open} setOpen={setOpen} />
      {/**Edit Shipping is actually view shipping */}
      <EditShipping id={id} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <Modal
        open={openStatusModal}
        title="Change Status"
        onCancel={() => setOpenStatusModal(false)}
        onOk={() => changeStatus()}
      >
        <div>
          Status :
          <Radio.Group
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <Radio value={"A"}>Active</Radio>
            <Radio value={"D"}>Disabled</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
}

export default ShippingMethod;
