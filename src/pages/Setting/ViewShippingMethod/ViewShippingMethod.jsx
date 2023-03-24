import React, { useEffect, useState } from "react";
import {
  ShippingTimeRates,
  TestRateCalculation,
  ShippingAdditionalSetting,
  StoreFronts,
  ShippingSuppliers,
  ShippingMethodGeneral,
} from "../..";
import { Breadcrumb, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ViewShippingMethod.module.css";
import cx from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCarriers,
  useGetCountries,
  useGetRecipient,
  useGetSender,
  useGetShippingMethodByID,
  useGetStates,
  useUpdateShippingMethod,
} from "../../../apis/ShippingMethodApi";
import Spinner from "../../../component/Spinner/Spinner";
const tabs = [
  "General",
  "Shipping time and rates",
  "Test rate calculation",
  "Additional settings",
  "Storefronts",
  "Suppliers",
];
function EditShipping() {
  const [singleShipment, setSingleShipment] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [haveRate, setHaveRate] = useState([]);
  const [shippingTimeRates, setShippingTimeRates] = useState([]);
  const [sender, setSender] = useState({});
  const [recipient, setRecipient] = useState({});
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [active, setActive] = useState(tabs[0]);
  const { data: generalData, isLoading: generalLoading } =
    useGetShippingMethodByID(id);
  const { data: carriers, isLoading: carriersLoading } = useGetCarriers();
  const { mutate: mutateUpdate, isLoading: updateLoading } =
    useUpdateShippingMethod();
  const { data: countryData } = useGetCountries();
  const { data: stateData } = useGetStates();
  const { data: senderData, isLoading: senderLoading } = useGetSender();
  const { data: recipientData, isLoading: recipientLoading } =
    useGetRecipient();
  // set sender data
  useEffect(() => {
    if (senderData?.data) {
      setSender(senderData?.data);
    }
  }, [senderData]);
  // set recipient data
  useEffect(() => {
    if (recipientData?.data) {
      setRecipient(recipientData?.data);
    }
  }, [recipientData]);
  // to get general data we can write useEffect hook
  useEffect(() => {
    if (generalData?.data) {
      setSingleShipment(generalData?.data);
      getDestinations();
    }
  }, [generalData]);
  useEffect(() => {
    console.log(shippingTimeRates);
  }, [shippingTimeRates]);
  // function for getting carriers
  const getCarriers = () => {
    if (carriers?.data) {
      let carrier = Object.entries(carriers?.data)?.map((el, i) => ({
        value: el[0],
        label: el[1],
        key: i,
      }));
      return carrier;
    }
    return [];
  };
  // Get country data
  const getCountries = () => {
    if (countryData?.data) {
      let countries = Object.entries(countryData?.data)?.map((item) => ({
        label: item[1],
        value: item[0],
      }));
      return countries;
    }
    return [];
  };
  // function for getting states
  const getStates = () => {
    if (stateData?.data) {
      let states = stateData?.data;
      return states;
    }
    return {};
  };
  // get shipping time and rates
  const getDestinations = () => {
    let temp = Object.values(generalData?.data?.rates || {})
      ?.filter((el, i) => el?.status === "A")
      ?.map((item) => ({
        label: item?.destination,
        value: item?.destination_id,
      }));
    let temp_rate =
      Object.values(generalData?.data?.rates || {})?.filter(
        (el, i) => el?.status === "A" && el?.rate_id
      ) || [];
    setHaveRate(temp_rate);
    setDestinations(temp);
  };
  // submit changes
  const onOkay = async () => {
    var formData = new FormData();
    let data_for_image = image
      ? {
          shipping_image_data: {
            0: {
              pair_id: singleShipment?.icon?.pair_id || "",
              type: "M",
              object_id: singleShipment?.icon?.object_id || "",
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
        }
      : {};
    const data = {
      shipping_id: id,
      shipping_data: { ...singleShipment },
      ...data_for_image,
      sender: { ...sender },
      recipient: { ...recipient },
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
    formData.append("shipping_data", JSON.stringify(data));
    formData.append("file", image);
    // function for update
    mutateUpdate(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["single_shipping_method", id]);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };
  const getContainerFromTab = () => {
    switch (active) {
      case tabs[1]:
        return (
          <ShippingTimeRates
            destinations={destinations}
            setShippingTimeRates={setShippingTimeRates}
            shippingTimeRates={shippingTimeRates}
            haveRate={haveRate}
            setHaveRate={setHaveRate}
          />
        );
      case tabs[2]:
        return (
          <TestRateCalculation
            countries={getCountries()}
            states={getStates()}
            sender={sender}
            setSender={setSender}
            recipient={recipient}
            setRecipient={setRecipient}
          />
        );
      case tabs[3]:
        return <ShippingAdditionalSetting />;
      case tabs[4]:
        return <StoreFronts />;
      case tabs[5]:
        return <ShippingSuppliers />;
      default:
        return Object.values(singleShipment).length ? (
          <ShippingMethodGeneral
            setSingleShipment={setSingleShipment}
            singleShipment={singleShipment}
            carriers={getCarriers()}
            image={image}
            setImage={setImage}
          />
        ) : (
          ""
        );
    }
  };
  if (
    generalLoading ||
    carriersLoading ||
    updateLoading ||
    recipientLoading ||
    senderLoading
  ) {
    return <Spinner />;
  }
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Settings</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Shipping Methods</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Button className={styles.button1} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button className={styles.button1} onClick={() => onOkay()}>
            Save
          </Button>
        </div>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.left}>
          {tabs.map((dat, i) => (
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
      </div>
      {getContainerFromTab()}
    </div>
  );
}

export default EditShipping;
