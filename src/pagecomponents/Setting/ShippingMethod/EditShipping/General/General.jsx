import React from "react";
import { Checkbox, Input, Radio } from "antd";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { message } from "antd";
import ImageUploader from "../../../../../component/ImageUploader/ImageUploaderForPromotion";
import styles from "./General.module.css";
const CheckboxGroup = Checkbox.Group;
const USER_GROUPS = [
  { label: "All", value: "0" },
  { label: "Guest", value: "1" },
  { label: "Registered", value: "2" },
];
const General = ({
  singleShipment,
  carriers,
  image,
  setImage,
  setSingleShipment,
}) => {
  //function to get image
  const getImage = (image) => {
    if (!!image) {
      return [
        {
          uid: "0",
          name: "main_image.jpg",
          status: "done",
          url: image?.icon?.image_path,
          pair_id: image?.pair_id,
          image_id: image?.image_id,
        },
      ];
    }
    return [];
  };
  // change usergroup handler
  const handleUserGroupChange = (value) => {
    let temp = { ...singleShipment };
    let values = value?.reduce((accumulator, currentValue) => {
      accumulator = accumulator + "," + currentValue;
      return accumulator;
    }, "");
    temp.usergroup_ids = values.slice(1);
    setSingleShipment(temp);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h3>Information</h3>

        <div></div>
        <div className={styles.section}>
          <label>Rate Calculation</label>{" "}
          <Select
            placeholder="Rate Calculation"
            style={{ width: 150 }}
            value={singleShipment?.rate_calculation}
            onChange={(e) =>
              setSingleShipment((dat) => ({
                ...dat,
                rate_calculation: e,
                carrier: e,
              }))
            }
            options={[
              {
                value: "Manual ",
                disabled: true,
                label: "Manual ",
              },
              {
                value: "M",
                label: "By customer's address",
              },
              {
                value: "N",
                label: "By Pickup Location",
              },
              {
                value: "Non Manual",
                disabled: true,
                label: "Non Manual ",
              },

              ...carriers,
            ]}
          />
        </div>
        <div className={styles.section}>
          <label>
            Name<span className={styles.red}> *</span> :
          </label>{" "}
          <Input
            placeholder="Name"
            value={singleShipment?.shipping}
            onChange={(e) =>
              setSingleShipment((dat) => ({
                ...dat,
                shipping: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.section}>
          <label>Status :</label>{" "}
          <div style={{ display: "flex" }}>
            <Radio.Group
              va
              onChange={(e) =>
                setSingleShipment((dat) => ({
                  ...dat,
                  status: e.target.value,
                }))
              }
              value={singleShipment?.status}
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
            imageList={getImage(singleShipment?.icon)}
            message={message}
          />
        </div>
        <div className={styles.section}>
          <label>Delivery Time:</label>{" "}
          <div>
            <Input
              placeholder="Delivery Time"
              value={singleShipment?.delivery_time}
              style={{ width: "150px" }}
              onChange={(e) =>
                setSingleShipment((dat) => ({
                  ...dat,
                  delivery_time: e.target.value,
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
          <div>Detailed description:</div>
          <ReactQuill
            theme="snow"
            value={singleShipment?.description}
            onChange={(e) =>
              setSingleShipment((dat) => ({
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
              value={singleShipment?.usergroup_ids?.split(",") || []}
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
          <label>Weight:</label>{" "}
          <div>
            <Input
              placeholder="Min"
              style={{ width: "100px" }}
              value={singleShipment?.min_weight}
              onChange={(e) =>
                setSingleShipment((dat) => ({
                  ...dat,
                  min_weight: e.target.value,
                }))
              }
            />
            -{" "}
            <Input
              placeholder="Max"
              style={{ width: "100px" }}
              value={singleShipment?.max_weight}
              onChange={(e) =>
                setSingleShipment((dat) => ({
                  ...dat,
                  max_weight: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.section}>
          <label>Allowed Payment Method :</label>{" "}
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
              onChange={(e) =>
                setSingleShipment((dat) => ({
                  ...dat,
                  allowedPayment: e,
                }))
              }
            />

            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
