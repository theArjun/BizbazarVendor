import React from "react";
import styles from "./Promotions.module.css";
import { Breadcrumb, Button, Table, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetPromotions,
  useDeletePromotions,
  useChangePromotionStatus,
} from "../../apis/PromotionApi";
import Spinner from "../../component/Spinner/Spinner";
import useWindowSize from "../../utils/Hooks/useWindowSize";
function Promotions() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { isLoading, mutate, isError } = useDeletePromotions();
  const { isLoading: isStatusChange, mutate: mutateStatus } =
    useChangePromotionStatus();
  const {
    isLoading: isPromotionLoading,
    data: promotionData,
    isError: isPromotionError,
    error: promotionError,
  } = useGetPromotions();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const queryClient = useQueryClient();
  //  lets get promotions from API
  const getPromotions = () => {
    try {
      if (isPromotionError) {
        console.log(promotionError);
        return [];
      }
      if (isPromotionLoading) {
        return [];
      }
      let data = [...promotionData?.data?.promotions];
      return data.map((el, i) => ({ ...el, key: el?.promotion_id }));
    } catch (e) {
      console.log("error on getting promotions", e.message);
    }
  };
  // lets delete promotions
  const deletePromotions = () => {
    let promotion_ids = selectedRowKeys.reduce((updater, current, i) => {
      updater[i] = current;
      return updater;
    }, {});
    let delete_data = {
      promotion_ids: {
        ...promotion_ids,
      },
    };
    // call mutation here to delete promotions
    mutate(delete_data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["promotions"]);
        console.log(response, "promotion updated success");
      },
      onError: (error) => {
        console.log("error on updating promotion, ", error);
      },
    });
  };
  // change status of promotion
  const changeStatus = (status) => {
    let status_data = {
      table_name: "promotions",
      status: status,
      id_name: "promotion_id",
      ids: selectedRowKeys,
    };
    mutateStatus(status_data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["promotions"]);
        console.log(response, "promotion updated success");
      },
      onError: (error) => {
        console.log("error on updating promotion, ", error);
      },
    });
  };
  // lets get status
  const getStatus = (status) => {
    switch (status) {
      case "A":
        return "Active";
      case "D":
        return "Disabled";
      case "H":
        return "Hidden";
      default:
        return "Pending";
    }
  };
  // lets handle the select status change
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (name, row) => (
        <React.Fragment>
          <a
            onClick={() =>
              navigate("../Marketing/Promotions/" + row?.promotion_id)
            }
            className={styles.promotion_name}
          >
            {name}
          </a>
        </React.Fragment>
      ),
    },
    {
      title: "Stop other rules",
      dataIndex: "stop_other_rules",
      key: "rules",
      render: (text) => (text == "N" ? "No" : "Yes"),
    },

    {
      title: "Priority",
      dataIndex: "priority",
      key: "4",
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "5",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
      render: (status) => <a>{getStatus(status)}</a>,
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  if (isLoading || isStatusChange) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Promotions</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.container}>
        <div className={styles.action_buttons}>
          <Button disabled={!hasSelected} onClick={deletePromotions}>
            Delete
          </Button>
          <Select
            disabled={!hasSelected}
            defaultValue="Status"
            style={{
              width: 170,
            }}
            onChange={changeStatus}
            options={[
              {
                label: "Change to Active",
                value: "A",
              },
              {
                label: "Change to Hidden",
                value: "H",
              },
              {
                label: "Change to Disabled",
                value: "D",
              },
            ]}
          />
        </div>
        <Table
          rowSelection={rowSelection}
          pagination={false}
          loading={isPromotionLoading}
          columns={columns}
          dataSource={getPromotions()}
          scroll={{
            y: windowSize.height > 670 ? 300 : 200,
            x: 700,
          }}
        />
      </div>
      <Button
        className={styles.buttonAddCatalog}
        onClick={() => navigate("/Marketing/Add Catalog Promotion")}
      >
        Add Catalog Promotion
      </Button>
    </div>
  );
}

export default Promotions;
