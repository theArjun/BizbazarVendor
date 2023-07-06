import React, { useState, useEffect } from "react";
import { Table, Image } from "antd";
import styles from "./Table.module.css";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const ReviewTable = ({ loading, handleScroll, reviews }) => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
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
  // get ratings
  const getRating = (rate) => {
    switch (rate) {
      case "1":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );
      case "2":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );

      case "3":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );

      case "4":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
          </div>
        );
      case "5":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
          </div>
        );
      default:
        return (
          <div>
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );
    }
  };
  // getting time and date
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp * 1000));
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
      title: "Image",
      dataIndex: "images",
      key: "image",
      width: "100px",
      render: (image) => (
        <React.Fragment>
          {Object.values(image)?.map((el, i) => {
            return (
              <Image
                key={i}
                width={50}
                src={el?.detailed?.image_path}
                fallback="/image_not_found.png"
              />
            );
          })}
        </React.Fragment>
      ),
    },
    {
      title: "Rating/Customer",
      dataIndex: "rating_value",
      key: "product",
      render: (rating, row) => (
        <div className={styles.rating}>
          <div
            style={{ margin: 0, display: "flex" }}
            onClick={() =>
              navigate(`../Products/Reviews/${row.product_review_id}`)
            }
          >
            <a>{`Review #${row.product_review_id}`}</a>
            &nbsp; &nbsp; {getRating(rating)}
          </div>
          <p style={{ margin: 0 }}>{row?.user_data?.name}</p>
        </div>
      ),
    },

    {
      title: "Helpfulness",
      dataIndex: "helpfulness",
      key: "helpfulness",
      render: (text) => (
        <React.Fragment>
          <span style={{ color: "green" }}>{text.vote_up}</span>/
          <span style={{ color: "red" }}>{text.vote_down}</span>
        </React.Fragment>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div style={status === "A" ? { color: "green" } : { color: "red" }}>
          {status === "A" ? "Approved" : "Not Approved"}
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "product_review_timestamp",
      render: (date) => getTimeAndDate(date),
    },
  ];
  return (
    <div>
      <Table
        id="product"
        rowKey={"product_review_id"}
        loading={loading}
        columns={columns}
        dataSource={reviews}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p
                style={{
                  margin: 0,
                }}
              >
                <b>Comment:</b>
                {" " + record.message.comment}
              </p>{" "}
              <p
                style={{
                  margin: 0,
                }}
              >
                <b>Advantages:</b>
                {" " + record.message.disadvantages}
              </p>{" "}
              <p
                style={{
                  margin: 0,
                }}
              >
                <b>Disadvantages: </b>
                {" " + record.message.disadvantages}
              </p>
            </div>
          ),
          rowExpandable: (record) => record.message,
        }}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ReviewTable;
