import React, { useState} from "react";
import { Breadcrumb } from "antd";
import styles from "./GiftCards.module.css";
import { useEffect } from "react";
import GiftCardsSearch from "../../../pagecomponents/Reports/GiftCards/Search/Search";
import GiftCardsTable from "../../../pagecomponents/Reports/GiftCards/Table/Table";
import { useGetGiftCards } from "../../../apis/ReportsApi";
const INITIAL_PARAMS = {
  gift_card_number: "",
  issued_time_from: "",
  issued_time_to: "",
  used_time_from: "",
  used_time_to: "",
};
const GiftCards = () => {
  const [giftData, setGiftData] = useState([]);
  const [params, setParams] = useState(INITIAL_PARAMS);
  const { data: giftCardData, isLoading } = useGetGiftCards(params);

  useEffect(() => {
    getGiftCardData();
  }, [giftCardData]);
  // getGIft card data
  const getGiftCardData = () => {
    if (giftCardData?.data?.report) {
      setGiftData(giftCardData?.data?.report);
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Report</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Gift Cards</Breadcrumb.Item>
      </Breadcrumb>
      <GiftCardsSearch
        params={params}
        setParams={setParams}
      />
      <GiftCardsTable
        giftData={giftData}
        loading={isLoading}
      />
    </div>
  );
};

export default GiftCards;
