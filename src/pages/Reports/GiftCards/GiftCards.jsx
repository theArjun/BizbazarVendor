import React, { useState } from "react";
import { Breadcrumb, Button, Result } from "antd";
import styles from "./GiftCards.module.css";
import GiftCardsSearch from "../../../pagecomponents/Reports/GiftCards/Search/Search";
import GiftCardsTable from "../../../pagecomponents/Reports/GiftCards/Table/Table";
import { useGetGiftCards } from "../../../apis/ReportsApi";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  gift_card_number: "",
  issued_time_from: "",
  issued_time_to: "",
  used_time_from: "",
  used_time_to: "",
};
const GiftCards = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: giftCardData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useGetGiftCards(params);
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  //  for getting gift card reports
  let getGiftCardsReportData = useMemo(() => {
    let temp = [];
    giftCardData?.pages?.map((el) => {
      el?.data?.report?.map((item) => {
        temp.push(item);
      });
    });
    return temp || [];
  }, [giftCardData]);
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
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
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Reports</Breadcrumb.Item>
        <Breadcrumb.Item>Gift Cards</Breadcrumb.Item>
      </Breadcrumb>
      <GiftCardsSearch params={params} setParams={setParams} />
      <GiftCardsTable
        giftData={getGiftCardsReportData}
        loading={isLoading || isFetchingNextPage}
        handleScroll={handleScroll}
      />
    </div>
  );
};

export default GiftCards;
