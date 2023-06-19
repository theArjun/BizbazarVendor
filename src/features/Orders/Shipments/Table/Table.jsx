import React, { useEffect } from "react";
import styles from "./Table.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tooltip } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { AiOutlineDownload, AiTwotonePrinter } from "react-icons/ai";
import Axios from "../../../../config/apiConfig";
const ShipmentTable = ({
  loading,
  shipments = [],
  handleScroll,
  setSortBy,
}) => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  // Getting date time value
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
  // Handling infinite scroll using dom
  useEffect(() => {
    document
      .querySelector("#shipments > div > div.ant-table-body")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#shipments > div > div.ant-table-body")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // Downloading pdf
  const downloadPdf = async (id) => {
    const postUrl = "print_packing_slip=1";
    Axios.get("VendorOrder/" + id + "?" + postUrl)
      .then((result) => {
        const myWindow = window.open("", "Print");
        myWindow.document.write(result?.data);

        const element = myWindow.document.querySelector("tbody");

        const doc = new jsPDF("p", "mm", "a4");
        html2canvas(element, {
          useCORS: true,
          allowTaint: true,
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 4, 4, 200, 240);
            doc.save("package_slip.pdf");
          }, 100)
          .then(() => {
            myWindow.close();
          });
      })
      .catch((error) =>
        console.log("Error on printing invoice pdf", error.message)
      );
  };

  const printPackagingSlip = async (id) => {
    const postUrl = "print_packing_slip=1";
    Axios.get(`VendorOrder/${id}?${postUrl}`)
      .then((result) => {
        const myWindow = window.open("", "Print");
        myWindow.document.write(result.data);
        myWindow.document.close();

        setTimeout(() => {
          myWindow.focus();
          myWindow.print();
          myWindow.close();
        }, 100);
      })
      .catch((error) =>
        console.log("Error on printing invoice", error.message)
      );
  };
  const columns = [
    {
      title: "S.N",
      dataIndex: "firstname",
      key: "order_id",
      render: (text, dat, i) => <div>{i + 1}</div>,
      width: 60,
    },
    {
      title: "Shipment ID",
      dataIndex: "shipment_id",
      key: "shipment_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/Shipments/${dat.shipment_id}`)}
        >
          #{text}
        </div>
      ),
      width: 140,
      sorter: (a, b) => {},
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text, dat) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/Orders/orders details/${dat.order_id}`)}
        >
          #{text}
        </div>
      ),
    },
    {
      title: "Order status",
      dataIndex: "order_status",
      key: "order_status",
    },
    {
      title: "Shipment  date",
      dataIndex: "shipment_timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
    },
    {
      title: "Order  date",
      dataIndex: "order_timestamp",
      key: "order_id",
      render: (text) => getTimeAndDate(text),
    },

    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text, row) => (
        <React.Fragment>
          {`${row?.s_lastname} ${row?.s_firstname}`}
        </React.Fragment>
      ),
    },

    {
      title: "Full order shipment",
      dataIndex: "full_order_shipment",
      key: "full_order_shipment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "data",
      key: "status",
      width: 50,
      align: "center",
      render: (text, row) => (
        <React.Fragment>
          <Tooltip
            className={styles.action_icons}
            title={"Print slip"}
            onClick={() => printPackagingSlip(row?.order_id)}
          >
            <AiTwotonePrinter size={20} color={"#250987"} />
          </Tooltip>
        </React.Fragment>
      ),
    },
    {
      title: "",
      dataIndex: "data",
      key: "status",
      width: 50,
      align: "center",
      render: (text, row) => (
        <React.Fragment>
          <Tooltip
            className={styles.action_icons}
            title={"Download slip"}
            onClick={() => downloadPdf(row?.order_id)}
          >
            <AiOutlineDownload size={20} color={"#2b9909"} />
          </Tooltip>
        </React.Fragment>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setSortBy(sorter);
  }

  return (
    <React.Fragment>
      <Table
        id="shipments"
        rowKey={"order_id"}
        columns={columns}
        loading={loading}
        dataSource={shipments}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 300,
          x: 1000,
        }}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default ShipmentTable;
