
import React, { useEffect, useState } from "react";
import styles from "./ViewShippingMethod.module.css";
import { Checkbox, Modal, Input, Radio, Button, Spin } from "antd";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { message, Upload } from "antd";


import ImgCrop from 'antd-img-crop';
import { apicall } from "../../../utils/apicall/apicall";
import { useNavigate, useParams } from "react-router-dom";


function EditShipping() {
  const [singleShipment,setSingleShipment]=useState({})
  const navigate = useNavigate();
const [loading,setLoading]=useState(false)


  const [carrier, setCarrier] = useState([]);
  const [infoData,setInfoData]=useState({})

  const [fileList, setFileList] = useState(null);
  const [update, setUpdate] = useState(false);

  const param = useParams();

  useEffect(() => {
    getCarrier();
  }, []);

  useEffect(() => {
    getSingleShipment();
  }, [update]);

  const getSingleShipment = async () => {
    setLoading(true);

    const result = await apicall({
      url: "ShippingMethod/" + param.id,
    });
    if (result.status === 200) {
      setSingleShipment(result.data);
    }
    setLoading(false);
  };

  const getCarrier = async () => {
    const result = await apicall({
      url: "VendorCarrier",
    });
    if (result.status === 200) {
      setCarrier(
        Object.entries(result.data.carriers).map((dat) => ({
          label: dat[1]?.name,
          value: dat[0],
        }))
      );
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList[0]?.originFileObj);
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return isJpgOrPng || isLt2M;
  };

  const onOkay = async () => {
    const data = {
      shipping_id: param.id,
      shipping_data: {
        rate_calculation:
          infoData?.rateCalculation || singleShipment?.rate_calculation,
        carrier: infoData?.time || singleShipment?.delivery_time,
        shipping: infoData?.name || singleShipment?.shipping,
        status: infoData.statusinfoData?.status || singleShipment?.status,
        delivery_time: infoData.time,
        description: infoData?.description || singleShipment?.description,
        usergroup_ids: infoData?.usergroup || singleShipment?.usergroup_ids,
        min_weight: infoData?.min || singleShipment?.min_weight,
        max_weight: infoData?.max || singleShipment?.max_weight,
        available_delivery_date: "N",
        rates: singleShipment?.rates,
        free_shipping: "N",
        is_adddress_required: "Y",
        test_weight: 1,
        storefront_ids: "",
      },
      shipping_image_data: {
        0: {
          pair_id: singleShipment?.icon?.pair_id || "",
          type: singleShipment?.icon?.type || "M",
          object_id: singleShipment?.icon?.type || 0,
          image_alt: singleShipment?.icon?.icon?.alt || "",
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
      result_ids: "rates",
      recipient: {
        country: "NP",
        state: "BGM",
        city: "Kathmandu",
        zipcode: "02125",
        address: "Kuleshowr",
      },
      sender: {
        country: "US",
        state: "NY",
        city: "New York",
        zipcode: "10001",
        address: "41 Avenue",
      },
    };

    var formdata = new FormData();
    formdata.append("shipping_data", JSON.stringify(data));
    formdata.append("file", JSON.stringify(fileList[0]));

    const result = await apicall({
      url: "ShippingMethod/",
      method: "post",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
      },
    });

    console.log(result);

    if (result.status == 200 || result.status === 201) {
      setUpdate((dat) => !dat);
    }
  };

  if (loading) return <>...loading</>;

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
            value={
              infoData?.rateCalculation || singleShipment?.rate_calculation
            }
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
                value: "non Manual",
                disabled: true,
                label: "Non Manual ",
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
            value={infoData?.name || singleShipment?.shipping}
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
              va
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  status: e.target.value,
                }))
              }
              value={infoData?.status || singleShipment?.status}
            >
              <Radio value={"A"}>Active</Radio>
              <Radio value={"D"}>Disabled</Radio>
            </Radio.Group>
            <div />
          </div>
        </div>
        <div className={styles.section}>
          <label>Icon :</label>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={
                fileList || [
                  {
                    uid: "-4",
                    name: "image.png",
                    status: "done",
                    url: singleShipment?.icon?.icon?.image_path,
                  },
                ]
              }
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
            >
              {fileList && fileList?.length < 1 ? "+ upload" : ""}
            </Upload>
          </ImgCrop>
        </div>
        <div className={styles.section}>
          <label>Delivery Time:</label>{" "}
          <div>
            <Input
              placeholder="Delivery Time"
              value={infoData?.time || singleShipment?.delivery_time}
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
          <div>Detailed description:</div>
          <ReactQuill
            className={styles.inputQuill}
            theme="snow"
            value={infoData?.description || singleShipment?.description}
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
            <Radio.Group
              va
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  usergroup: e.target.value,
                }))
              }
              value={infoData?.usergroup || singleShipment?.usergroup_ids}
            >
              <Radio value={"0"}>All</Radio>
              <Radio value={"1"}>Guest</Radio>
              <Radio value={"2"}>Registered</Radio>
            </Radio.Group>

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
              value={infoData?.min || singleShipment?.min_weight}
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
              value={infoData?.max || singleShipment?.max_weight}
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
          <label>Allowed Payment :</label>{" "}
          <div style={{ display: "flex" }}>
            <Checkbox.Group
              options={[
                "Connect Credit card",
                "IMEPay",
                "Khalti",
                "PAY BY CARD",

                "IMEPay",
                " Phone ordering ",
                "Money Order ",
                "C.O.D",
              ]}
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  allowedPayment: e,
                }))
              }
            />

            <div />
          </div>
        </div>
        <div className={styles.section}>
          <label>Method:</label>{" "}
          <div style={{ display: "flex" }}>
            <div />

            <Checkbox.Group
              options={[
                "Purchase Order",
                "Personal Check",
                " Government Check",
                " Traveller's Check ",
              ]}
              onChange={(e) =>
                setInfoData((dat) => ({
                  ...dat,
                  method: e,
                }))
              }
            />

            <div />
          </div>
        </div>
      </div>
      <Button className={styles.button} onClick={() => onOkay()}>
        Save
      </Button>
      <Button className={styles.button1} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
    // </Modal>
  );
}

export default EditShipping;
