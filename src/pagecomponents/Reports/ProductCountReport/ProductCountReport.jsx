import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductCountReport.module.css";
import { Button, Space, Table, Tag } from "antd";
import { CSVLink } from "react-csv";
import { useLocation } from "react-router-dom";
import { apicall2 } from "../../../utils/apicall/apicall2";
import { useReactToPrint } from "react-to-print";
import { useGetProductCountReport } from "../../../apis/ReportsApi";
import { useMemo } from "react";

function ProductCountReport() {
  const location = useLocation();
  const [print, setPrint] = useState(false);
  const { data: countData, isLoading } = useGetProductCountReport();
  const componentRef = useRef();
  //  for getting gift card reports
  let getProductCountReport = useMemo(() => {
    if (countData) {
      return countData?.data;
    }
    return [];
  }, [countData]);
  const columns = [
    {
      title: "Vendor Id",
      dataIndex: "company_id",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vendor Name",
      dataIndex: "company",
    },
    {
      title: "Vendor Plan",
      dataIndex: "plan",
    },
    {
      title: "Total Products",
      dataIndex: "total_products",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Active Products",
      dataIndex: "active_products",
    },
    {
      title: "Disable Products",
      dataIndex: "disabled_products",
    },

    {
      title: "Out Of Stock Products",
      dataIndex: "out_of_stock_products",
    },
    {
      title: "Image Missing Products",
      dataIndex: "images_missing_count",
    },
  ];

  const printing = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrint(false),
  });

  const handlePrint = () => {
    setPrint(true);
    const time = setTimeout(printing, 10);
    return () => clearTimeout(time);
  };

  return (
    <div className={styles.container}>
      <Table
        pagination={false}
        columns={columns}
        loading={isLoading}
        dataSource={getProductCountReport}
        rowKey={"company_id"}
        scroll={{
          x: 1000,
        }}
      />
      {location.pathname != "/" && (
        <div className={styles.positionabsolute}>
          <Button className={styles.print} onClick={handlePrint}>
            print
          </Button>
          <Button>
            <CSVLink
              filename={"ProductCountReport.csv"}
              data={getProductCountReport || []}
              className="btn btn-primary"
              onClick={() => {}}
            >
              Export to CSV
            </CSVLink>
          </Button>
        </div>
      )}
      {print && <div className={styles.margintop} />}
      {print && (
        <Table
          ref={componentRef}
          pagination={false}
          rowKey={"company_id"}
          columns={columns}
          dataSource={getProductCountReport}
        />
      )}
    </div>
  );
}

export default ProductCountReport;
