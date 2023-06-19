import React, { useEffect, useState } from "react";
import {
  ShippingTimeRates,
  TestRateCalculation,
  ShippingAdditionalSetting,
  StoreFronts,
  ShippingSuppliers,
  ShippingMethodGeneral,
} from "../..";
import { Breadcrumb, Button, Result } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  useGetStoreFrontData,
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
const { id: company_id } = JSON.parse(sessionStorage.getItem("userinfo"));
function EditShipping() {
  const [singleShipment, setSingleShipment] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [storefronts, setStorefronts] = useState([]);
  const [allDestination, setAllDestination] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [haveRate, setHaveRate] = useState([]);
  const [shippingTimeRates, setShippingTimeRates] = useState([]);
  const [sender, setSender] = useState({});
  const [recipient, setRecipient] = useState({});
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [active, setActive] = useState(tabs[0]);
  const {
    data: generalData,
    isLoading: generalLoading,
    isError,
    error,
  } = useGetShippingMethodByID(id);
  const { data: carriers, isLoading: carriersLoading } = useGetCarriers();
  const { mutate: mutateUpdate, isLoading: updateLoading } =
    useUpdateShippingMethod();
  const { data: countryData } = useGetCountries();
  const { data: stateData } = useGetStates();
  const { data: senderData, isLoading: senderLoading } = useGetSender();
  const { data: recipientData, isLoading: recipientLoading } =
    useGetRecipient();
  const { data: storeFrontData, isLoading: storefrontLoading } =
    useGetStoreFrontData(id);
  // set sender data
  useEffect(() => {
    if (senderData?.data) {
      setSender(senderData?.data);
    }
  }, [senderData]);
  useEffect(() => {
    if (storeFrontData?.data) {
      setStorefronts(
        Object.values(storeFrontData?.data?.storefronts || {})?.map((el) => ({
          ...el,
          key: el["id"],
        })) || {}
      );
    }
  }, [storeFrontData]);
  // set recipient data
  useEffect(() => {
    if (recipientData?.data) {
      setRecipient(recipientData?.data);
    }
  }, [recipientData]);
  // to get general data we can write useEffect hook
  useEffect(() => {
    if (generalData?.data) {
      setIsDisabled(company_id == generalData?.data?.company_id);
      setSingleShipment(generalData?.data);
      getDestinations();
    }
  }, [generalData]);

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
        (el, i) => (el?.status === "D" || el?.status === "A") && el?.rate_id
      ) || [];
    let temp_all_rate =
      Object.values(generalData?.data?.rates || {})?.filter(
        (el, i) => el?.status === "A"
      ) || [];
    setAllDestination(temp_all_rate);
    setHaveRate(temp_rate.reverse());
    setDestinations(temp);
  };
  // submit changes
  const onOkay = async () => {
    var formData = new FormData();
    let time_and_shipping = [...haveRate];
    let temp_time_rate_data = {
      0: "",
      ...time_and_shipping?.reduce((accumulator, currentValue, i) => {
        accumulator[currentValue?.destination_id] = currentValue || "";
        return accumulator;
      }, {}),
      delivery_time: {
        ...time_and_shipping?.reduce((accumulator, currentValue, i) => {
          accumulator[currentValue?.destination_id] =
            parseInt(currentValue?.delivery_time) || "";
          return accumulator;
        }, {}),
      },
    };
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
      shipping_data: { ...singleShipment, rates: { ...temp_time_rate_data } },

      ...data_for_image,
      sender: { ...sender },
      recipient: { ...recipient },
      result_ids: "rates",
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
            allDestination={allDestination}
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
        return (
          <ShippingAdditionalSetting
            singleShipment={singleShipment}
            setSingleShipment={setSingleShipment}
          />
        );
      case tabs[4]:
        return (
          <StoreFronts
            storefronts={storefronts}
            setStorefront={setStorefronts}
            singleShipment={singleShipment}
            setSingleShipment={setSingleShipment}
          />
        );
      case tabs[5]:
        return (
          <ShippingSuppliers
            singleShipment={singleShipment}
            setSingleShipment={setSingleShipment}
          />
        );
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
    senderLoading ||
    storefrontLoading
  ) {
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
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Setting/Shipping Methods">Shipping Methods</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.action_btn}>
          <Button className={styles.button1} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            style={!isDisabled ? { display: "none" } : {}}
            className={styles.button1}
            onClick={() => onOkay()}
          >
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
      <div className={isDisabled ? "" : styles.area_disabled}>
        {getContainerFromTab()}
      </div>
    </div>
  );
}

export default EditShipping;
