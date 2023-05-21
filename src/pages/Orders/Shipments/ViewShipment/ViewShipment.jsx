import React, { useEffect, useMemo, useState } from "react";
import styles from "./ViewShipment.module.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetSingleShipment } from "../../../../apis/ShipmentApi";
import Spinner from "../../../../component/Spinner/Spinner";
import { Breadcrumb, Button, Dropdown, Result, Tag, Input } from "antd";
import { AiFillSetting } from "react-icons/ai";
import Axios from "../../../../config/apiConfig";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const { TextArea } = Input;
const ViewShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState({});
  const { data, isLoading, isError, error } = useGetSingleShipment(id);
  useEffect(() => {
    let abortController = new AbortController();
    /* In the above code, I’ve used AbortController to unsubscribe the effect. When the async action is completed, then I abort the controller and unsubscribe the effect. */

    // Action is here
    setShipment(data?.data || {});
    return () => {
      abortController.abort();
    };
  }, [data]);

  //  function for handling print and download button click
  const handleMenuClick = (value) => {
    if (value.key === "1") {
      printPackagingSlip(shipment?.order_id);
    } else {
      downloadPdf(shipment?.order_id);
    }
  };
  const items = [
    {
      label: "Print packing slip",
      key: "1",
    },
    {
      label: "Download packing slip",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  // get status tag
  const getStatusTag = (status) => {
    return <Tag color="green">{status}</Tag>;
  };
  // Getting time and date
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
  if (isLoading) {
    return <Spinner />;
  }
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
    <div className={styles.view_shipment}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="">Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shipments</Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.action_buttons}>
          <Dropdown menu={menuProps}>
            <Button type="primary">
              <AiFillSetting size={20} color="white" />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className={styles.view_shipment_content}>
        <div className={styles.view_shipment_content_left}>
          <div className={styles.container_left_content}>
            <div className={styles.top_content}>
              <div className={styles.top_content_left}>
                <h4>Billing address</h4>
                <div>
                  <div className={styles.billing_username}>{`${
                    shipment?.firstname || ""
                  } ${shipment?.lastname || ""}`}</div>
                </div>
              </div>
              <div className={styles.top_content_right}>
                <h4>Shipping address</h4>
                <div></div>
              </div>
            </div>
            <div className={styles.hr_line}></div>
            <div className={styles.mid_content}>
              <b>{`${shipment?.firstname || ""} ${
                shipment?.lastname || ""
              }, ${"test@gmail.com"}`}</b>
              <div className={styles.mid_content_info}>
                <div>IP address: </div>
                <div>Value</div>
              </div>
              <div className={styles.mid_content_info}>
                <div>Phone: </div>
                <div>Value</div>
              </div>
            </div>
            <div className={styles.hr_line}></div>
            <div className={styles.bottom_content}>
              <div className={styles.bottom_content_top}>
                <div className={styles.product_name}>
                  <h5>Product</h5>
                  <Link to={`/Products/${shipment?.order_id}`}>
                    {shipment?.product_name || "Test Product"}
                  </Link>
                  <div>{shipment?.category || "Test Category"}</div>
                  <div>{shipment?.code || "Test Code"}</div>
                </div>
                <div className={styles.product_quantity}>
                  <h5>Quantity</h5>
                  <div>{shipment?.amount || 1}</div>
                </div>
              </div>
              <div className={styles.bottom_content_mid}>
                <h4>Comments</h4>
                <TextArea value={shipment?.comments} rows={5} />
                <div className={styles.send_btn}>
                  <Button type="primary">Update comment</Button>
                </div>
              </div>
              <div className={styles.bottom_content_mid}>
                <h4>Shipping date</h4>
                <div>{getTimeAndDate(shipment?.shipment_timestamp)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.view_shipment_content_right}>
          <div className={styles.view_shipment_content_right_content}>
            <h4>Shipment information</h4>
            <div className={styles.shipment_information_content}>
              Shipment {`#${shipment?.shipment_id || ""}`} on{" "}
              {getTimeAndDate(shipment?.shipment_timestamp)} by
              {` ${shipment?.shipping || shipment?.carrier_info?.name || ""} `}(
              {`${shipment?.tracking_number || ""}`})
              <div style={{ marginTop: "5px" }}>
                <b>Status</b>
                <div className={styles.status_value}>
                  {getStatusTag(shipment?.status)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShipment;
