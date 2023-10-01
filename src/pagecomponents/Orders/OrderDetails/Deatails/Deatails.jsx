import React, { useRef, useState } from "react";
import LeftContain from "../Components/LeftContain/LeftContain";
import Midcontain from "../Components/Midcontain/Midcontain";
import styles from "./Details.module.css";
import cx from "classnames";
import RightContain from "../Components/RightContain/RightContain";
import { Button, Dropdown } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { useUpdateOrder } from "../../../../apis/OrdersApi";
import { useQueryClient } from "@tanstack/react-query";
import Axios from "../../../../config/apiConfig";
// import jsPDF from "jspdf";

function Deatails({
  orderDetail,
  statusModalOpen,
  setStatusModalOpen,
  status,
}) {
  const midTab = ["General", "Add On", "Promotion"];
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [active, setActive] = useState("General");
  const [updateState, setUpdateState] = useState({});
  const { mutate: orderMutate, isLoading: updateLoading } = useUpdateOrder();
  const getContainerFromTab = () => {
    switch (active) {
      case "Add On":
        return <>Add on</>;
      case "Promotion":
        return <>Promotion</>;

      default:
        return (
          <Midcontain
            updateState={updateState}
            setUpdateState={setUpdateState}
            orderDetail={orderDetail}
          />
        );
    }
  };

  const updateOrder = async () => {
    if (Object.keys(updateState).length === 0) {
      return;
    }
    const tn = JSON.parse(`{"${
      orderDetail.shipment_ids.length > 0 ? orderDetail.shipment_ids[0] : 0
    }":
     {"tracking_number":"${
       updateState?.trackingNumber ||
       orderDetail?.shipment_info[0]?.tracking_number ||
       ""
     }",
         "shipping_id":6,
           "carrier":"${
             updateState?.carrier ||
             orderDetail?.shipment_info[0]?.carrier ||
             ""
           }"}}`);
    let data = {
      order_id: orderDetail.order_id,
      update_order: {
        notes: updateState?.customernotes || orderDetail?.notes,
        details: updateState?.staffnotes || orderDetail?.details,
        issuer_id: updateState?.manager || orderDetail?.issuer_id,
        delivery_date: orderDetail?.timestamp,
        delivery_time_from: 0,
        delivery_time_to: 0,
        delivery_message: 0,
      },
      update_shipping: { 0: tn },
    };
    orderMutate(data, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["single_order", orderDetail.order_id]);
      },
    });
  };

  const printInvoice = async (dat) => {
    const postUrl = dat === 1 ? "print_invoice=1" : "print_packing_slip=1";
    Axios.get(`VendorOrder/${orderDetail.order_id}?${postUrl}`)
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

  const printInvoicePdf = async (dat) => {
    const postUrl = dat === 1 ? "print_invoice=1" : "print_packing_slip=1";
    Axios.get("VendorOrder/" + orderDetail.order_id + "?" + postUrl)
      .then((result) => {
        const myWindow = window.open("", "Print");
        myWindow.document.write(result.data);

        const element = myWindow.document.querySelector("tbody");

        const doc = new jsPDF("p", "mm", dat === 2 ? "a5" : "a4");
        html2canvas(element, {
          useCORS: true,
          allowTaint: true,
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(
              imgData,
              "PNG",
              4,
              4,
              dat === 2 ? 150 : 200,
              dat === 2 ? 230 : 240
            );
            doc.save("output.pdf");
          }, 100)
          .then(() => {
            myWindow.close();
          });
      })
      .catch((error) =>
        console.log("Error on printing invoice pdf", error.message)
      );
  };

  const tweakInvoice = async () => {
    navigate("/TweakAndInvoice/" + orderDetail.order_id);
  };

  const items = [
    {
      key: "1",
      label: <div onClick={() => printInvoice(1)}> Print invoice</div>,
    },
    {
      key: "2",
      label: <div onClick={tweakInvoice}>Tweak and send invoice</div>,
    },
    {
      key: "3",
      label: <div onClick={() => printInvoice(2)}>Print packing slip</div>,
    },
    {
      key: "6",
      label: <div onClick={() => printInvoicePdf(1)}> Print invoice (pdf)</div>,
    },
    {
      key: "7",
      label: (
        <div onClick={() => printInvoicePdf(2)}> Print packing slip (pdf)</div>
      ),
    },
  ];

  return (
    <div ref={contentRef} className={styles.container}>
      <div id="content" className={styles.leftContain}>
        <i></i>
        <LeftContain orderDetail={orderDetail} />
      </div>
      <div className={styles.midcontain}>
        <div className={styles.tabContainer}>
          {midTab.map((dat, i) => (
            <div
              className={cx(
                styles.button,
                active === dat ? styles.bgColor : null
              )}
              key={i}
              onClick={() => setActive(dat)}
            >
              {dat}
            </div>
          ))}
        </div>
        {getContainerFromTab()}
      </div>
      <div className={styles.rightContain}>
        <RightContain
          setUpdateState={setUpdateState}
          orderDetail={orderDetail}
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
          status={status}
        />
      </div>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow={{
          pointAtCenter: true,
        }}
        className={styles.savebutton1}
      >
        <Button>Setting</Button>
      </Dropdown>
      <Button
        className={styles.savebutton}
        loading={updateLoading}
        onClick={() => updateOrder()}
      >
        Save
      </Button>
    </div>
  );
}

export default Deatails;
