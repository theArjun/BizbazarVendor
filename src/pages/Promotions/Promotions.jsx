import React from "react";
import styles from "./Promotions.module.css";
import { Breadcrumb, Button, Table, Select, Tag, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetPromotions,
  useDeletePromotions,
  useChangePromotionStatus,
} from "../../apis/PromotionApi";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import useDebounce from "../../utils/Hooks/useDebounce";
import { useMemo } from "react";
function Promotions() {
  const [bottom, setBottom] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { isLoading, mutate } = useDeletePromotions();
  const { isLoading: isStatusChange, mutate: mutateStatus } =
    useChangePromotionStatus();
  const {
    isLoading: isPromotionLoading,
    data: promotionData,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useGetPromotions();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const queryClient = useQueryClient();
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  useEffect(() => {
    document
      .querySelector("#product > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#product > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
  let promotionsData = useMemo(() => {
    let temp = [];
    promotionData?.pages?.map((el) => {
      el?.data?.promotions?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [promotionData]);
  //  set Status of product
  const getPromotionStatus = (status) => {
    switch (status) {
      case "H":
        return <Tag color="purple">Hidden</Tag>;
      case "A":
        return <Tag color="green">Active</Tag>;
      case "D":
        return <Tag color="orange">Disabled</Tag>;
      default:
        return <Tag color="magenta">Pending</Tag>;
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
      render: (status) => <a>{getPromotionStatus(status)}</a>,
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
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Marketing</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Promotions</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
          className={styles.buttonAddCatalog}
          onClick={() => navigate("/Marketing/Add Catalog Promotion")}
        >
          Add Catalog Promotion
        </Button>
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
          id="product"
          rowKey={"promotion_id"}
          rowSelection={rowSelection}
          pagination={false}
          loading={
            isPromotionLoading ||
            isStatusChange ||
            isLoading ||
            isFetchingNextPage
          }
          columns={columns}
          dataSource={promotionsData}
          scroll={{
            y: windowSize.height > 670 ? 450 : 200,
            x: 700,
          }}
        />
      </div>
    </div>
  );
}

export default Promotions;
