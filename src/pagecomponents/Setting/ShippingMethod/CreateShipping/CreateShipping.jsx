import React, { useEffect, useState } from "react";
import styles from "./CreateShipping.module.css";
import { Checkbox, Modal, Input, Radio } from "antd";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import ImageUploader from "../../../../component/ImageUploader/ImageUploaderForPromotion";
import {
  useCreateShippingMethods,
  useGetVendorCarriers,
} from "../../../../apis/ShippingMethodApi";
import { useQueryClient } from "@tanstack/react-query";
const CheckboxGroup = Checkbox.Group;
const USER_GROUPS = [
  { label: "All", value: "0" },
  { label: "Guest", value: "1" },
  { label: "Registered", value: "2" },
];
function CreateShipping({ open, setOpen }) {
  let active = false;
  const queryClient = useQueryClient();
  const [carrier, setCarrier] = useState([]);
  const [infoData, setInfoData] = useState({});
  const [image, setImage] = useState("");
  const { mutate, isLoading } = useCreateShippingMethods();
  const { data: carriersData, isLoading: carrierLoading } =
    useGetVendorCarriers();
  useEffect(() => {
    getCarrier();
  }, [carriersData]);
  // change usergroup handler
  const handleUserGroupChange = (value) => {
    let temp = { ...infoData };
    let values = value?.reduce((accumulator, currentValue) => {
      accumulator = accumulator + "," + currentValue;
      return accumulator;
    }, "");
    temp.usergroup = values.slice(1);
    setInfoData(temp);
  };
  // Function for getting carriers
  const getCarrier = async () => {
    setCarrier(
      Object.entries(carriersData?.data?.carriers || {}).map((dat, i) => ({
        label: dat[1]?.name,
        value: dat[0],
        key: i,
      }))
    );
  };
  const onOkay = async () => {
    if (active) {
      message.error("Loading");
      return;
    }
    if (!infoData?.name) {
      message.error("Name is empty");
      return;
    }
    // active=true

    // console.log("hello");

    const data = {
      shipping_id: 0,
      shipping_data: {
        rate_calculation: infoData.rateCalculation,
        carrier: infoData.rateCalculation,
        shipping: infoData.name,
        status: infoData.status,
        delivery_time: infoData.time,
        description: infoData.description,
        usergroup_ids: infoData.usergroup,
        company_id: JSON.parse(localStorage.getItem("userinfo"))?.id,
        min_weight: infoData.min,
        max_weight: infoData.max,
        available_delivery_date: "N",
      },
      shipping_image_data: {
        0: {
          pair_id: "",
          type: "M",
          object_id: 0,
          image_alt: "",
        },
      },
      file_shipping_image_icon: {
        0: "shipping",
      },
      type_shipping_image_icon: {
        0: "local",
      },
      is_high_res_shipping_image_icon: {
        0: "N",
      },
    };

    var formData = new FormData();
    formData.append("shipping_data", JSON.stringify(data));
    formData.append("file", image);

    Modal.warn({
      title: "Are you sure!",
      closable: true,
      onCancel: () => {
        // setUpdate(dat=>!dat)
        active = false;
        setOpen(false);
      },
      onOk: () => {
        mutate(formData, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(["shippings"]);
            active = false;
            setOpen(false);
          },
        });
      },
    });
  };

  return (
    <Modal
      centered
      className={styles.shipping_create_modal}
      open={open}
      onOk={onOkay}
      okButtonProps={{
        loading: isLoading,
      }}
      onCancel={() => setOpen(false)}
      width={`90vw`}
      okText={"Create"}
    >
      <div className={styles.container}>
        <div className={styles.title}>Create Shipping Method</div>
        <h3>Information</h3>
        <div className={styles.section}>
          <label>Rate Calculation</label>{" "}
          <Select
            placeholder="Rate Calculation"
            style={{ width: 150 }}
            onChange={(e) =>
              setInfoData((dat) => ({
                ...dat,
                rateCalculation: e,
              }))
            }
            options={[
              {
                value: "Manual ",
                disabled: true,
                label: "Manual ",
                key: "manual",
              },
              {
                value: "By customer's address",
                label: "By customer's address",
                key: "customer",
              },
              {
                value: "By Pickup Location",
                label: "By Pickup Location",
                key: "pickup",
              },
              {
                value: "non Manual",
                disabled: true,
                label: "Non Manual ",
                key: "non_manual",
              },

              ...carrier,
            ]}
          />
        </div>
        <div className={styles.section}>
          <label>
            Name<span className={styles.red}> *</span> :
          </label>{" "}
          <Input
            placeholder="Name"
            onChange={(e) =>
              setInfoData((dat) => ({
                ...dat,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.section}>
          <label>Status :</label>{" "}
          <div style={{ display: "flex" }}>
            <Radio.Group
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  status: e.target.value,
                }))
              }
              value={infoData?.status}
            >
              <Radio value={"A"}>Active</Radio>
              <Radio value={"D"}>Disabled</Radio>
            </Radio.Group>
            <div />
          </div>
        </div>
        <div className={styles.section}>
          <label>Icon :</label>
          <ImageUploader
            image={image}
            setImage={setImage}
            imageList={[]}
            message={message}
          />
        </div>
        <div className={styles.section}>
          <label>Delivery Time:</label>{" "}
          <div>
            <Input
              type="time"
              placeholder="Basic usage"
              style={{ width: "150px" }}
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  time: e.target.value,
                }))
              }
            />
            <br />
            The delivery time appears next to the name of the shipping method.
            If you use realtime shipping rate calculation, your shipping service
            may provide its own delivery time. The time provided by the shipping
            service will be displayed instead of the time you specify here.
          </div>
        </div>
        <span></span>
        <div className={styles.section}>
          <label>Detailed description:</label>
          <ReactQuill
            className={styles.inputQuill}
            theme="snow"
            onChange={(e) =>
              setInfoData((dat) => ({
                ...dat,
                description: e,
              }))
            }
          />
        </div>
        <h3>Ability</h3>
        <div className={styles.section}>
          <label>User Group :</label>{" "}
          <div style={{ display: "flex" }}>
            <CheckboxGroup
              options={USER_GROUPS}
              onChange={handleUserGroupChange}
            />
            <div />
          </div>
        </div>
        <div className={styles.section}>
          <label>Owner :</label>{" "}
          <div style={{ display: "flex" }}>
            {JSON.parse(localStorage.getItem("userinfo"))?.name}

            <div />
          </div>
        </div>
        <div className={styles.section}>
          <label>Weight(kg):</label>{" "}
          <div>
            <Input
              type="number"
              placeholder="Min"
              style={{ width: "100px" }}
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  min: e.target.value,
                }))
              }
            />
            -{" "}
            <Input
              placeholder="Max"
              style={{ width: "100px" }}
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  max: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.section}>
          <label>Allowed Payment Method:</label>{" "}
          <div style={{ display: "flex" }} className={styles.section_body}>
            <Checkbox.Group
              options={[
                "Connect Credit card",
                "IMEPay",
                "Khalti",
                "PAY BY CARD",
                " Phone ordering ",
                "Money Order ",
                "C.O.D",
                "Purchase Order",
                "Personal Check",
                " Government Check",
                " Traveller's Check ",
              ]}
              onChange={(e) => {
                console.log(e);
                setInfoData((dat) => ({
                  ...dat,
                  allowedPaymentMethod: e,
                }));
              }}
            />

            <div />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateShipping;
