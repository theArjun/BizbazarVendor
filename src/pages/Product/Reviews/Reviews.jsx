import React, { useEffect, useState } from "react";
import { ReviewSearch, ReviewTable } from "../..";
import styles from "./Reviews.module.css";
import { Breadcrumb, Button, Result } from "antd";
import { useGetReviews } from "../../../apis/ReviewsApi";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  name: "",
  rating: "",
  message: "",
  has_images: "",
};
const Reviews = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const navigate = useNavigate();
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isFetchingNextPage,
    fetchNextPage,
    error,
    isError,
  } = useGetReviews(params);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
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
  // getReviews
  let getCustomerReviews = useMemo(() => {
    let temp = [];
    reviewData?.pages?.map((el) => {
      temp = [...temp, ...Object.values(el?.data?.reviews || {})];
    });
    return temp || [];
  }, [reviewData]);
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
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Products</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Reviews</Breadcrumb.Item>
      </Breadcrumb>
      <ReviewSearch params={params} setParams={setParams} />
      <ReviewTable
        handleScroll={handleScroll}
        loading={reviewLoading || isFetchingNextPage}
        reviews={getCustomerReviews}
      />
    </div>
  );
};

export default Reviews;
